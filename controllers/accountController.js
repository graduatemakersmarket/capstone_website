const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const roleController = require('../controllers/roleController')
const accountService = require('../services/accountService')
const validator = require('express-validator');
const time = require('../utils/time');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const getAccountByEmail = async (email) => accountService.getAccountByEmail(email);
const getAccountByID = async (id) => accountService.getAccountByID(id);
const getVerifiedAccounts = async (limit, offset) => accountService.getVerifiedAccounts(limit, offset);
const getFeaturedAccounts = async () => accountService.getFeaturedAccounts();
const getAccounts = async (limit, offset) => accountService.getAccounts(limit, offset);
const getVerifiedAccountCount = async () => accountService.countVerifiedAccounts();
const getAccountCount = async () => accountService.countAccounts();

/*************************************************************************************************/
/* Register a new user account
/*************************************************************************************************/
const registerAccount = async (req, res) => {
  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt if a logged in user is trying to create a new account
  if (req.cookies.makerSession || req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You must log out to register a new account',
    });
  }

  // Halt if the provided email address is already in use
  if (await accountService.getAccountByEmail(req.body['register-email'])) {
    return res.status(403).json({
      success: false,
      error: `The email address ${req.body['register-email']} is already in use`,
    });
  }

  // Halt if domain does not contain @uark.edu
  if (!req.body['register-email'].includes('@uark.edu')) {
    return res.status(422).json({
        success: false,
        error: 'You must use an @uark.edu email address',
      });
  }

  // Create a new account object
  const account = {
    email: req.body['register-email'],
    password: await bcrypt.hash(req.body['register-password'], 12),
    first_name: req.body['register-firstname'],
    last_name: req.body['register-lastname'],
    avatar: '/images/avatar_images/default.png',
    featured_background: '/images/featured_images/default.png',
    creation_date: time.getCurrentTimestamp(),
    updated_date: time.getCurrentTimestamp()
  };

  // Create a new role object
  const role = {
    role: 'maker',
    issuer: 'system',
    account_email: account.email,
  };

  // Create the new account
  await accountService.createAccount(account);
  
  // Create a new account role
  await roleController.createRole(role);

  // Create a new session object
  const session = {
    email: account.email,
    verified: 0,
    avatar: account.avatar,
    roles: [role.role]
  };
  
  // Configure cookie options
  const options = {
    httpOnly: true,
    secure: true,
    samesite: true,
  };
  
  // Create a new session token
  const token = jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '2h' });
  
  return res.status(201).cookie('makerSession', token, options).json({
    success: true,
    response: `Your account ${account.email} has been successfully created`,
  })
}

/*************************************************************************************************/
/* Log into an existing user account
/*************************************************************************************************/
const loginAccount = async (req, res) => {
  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt if the user already has an active session
  if (req.cookies.makerSession || req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You already have an active user session',
    });
  }

  // Look up the account by email address
  const accountInfo = await accountService.getAccountByEmail(req.body['login-email'])

  // Halt if the account does not exist
  if (!accountInfo) {
    return res.status(401).json({
      success: false,
      error: 'Bad username or password',
    });
  }

  // Halt if the supplied password hash does not match what is in the database
  if (!await bcrypt.compare(req.body['login-password'], accountInfo.password)) {
    return res.status(401).json({
      success: false,
      error: 'Bad username or password',
    });
  }

  // Grab the roles associated with account
  const roles = await roleController.getRolesByEmail(req.body['login-email']);

  // Halt if the account is banned or reserved
  if (roles.includes('banned') || roles.includes('reserved')) {
    return res.status(403).json({
      success: false,
      error: 'This account has been banned for violating our terms of service',
    });
  }

  // Create a new session object
  const session = {
    email: accountInfo.email,
    verified: accountInfo.account_verified,
    avatar: accountInfo.avatar,
    roles: roles
  };

  // Configure cookie options
  const options = {
    httpOnly: true,
    secure: true,
    samesite: true,
  };

  // Create a new session token
  const token = jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '2h' });

  return res.status(201).cookie('makerSession', token, options).json({
    success: true,
    response: `A session for ${accountInfo.email} has been successfully created`,
  });
}

/*************************************************************************************************/
/* Update an existing account
/*************************************************************************************************/
const updateAccount = async (req, res) => {
  // Only allow users with a valid session to access this endpoint
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt if the user tries to upload a bad file
  if (req.isBadFiletype) {
    return res.status(422).json({
      success: false,
      error: 'You have tried to upload an invalid image',
    });
  }

  // Check if the user supplied a valid avatar image
  if (req.file) {

    // if the user supplied an avatar, include it in the update
    const account = {
      first_name: req.body['update-firstname'],
      last_name: req.body['update-lastname'],
      avatar: `/images/avatar_images/${req.file.filename}`,
      biography: req.body['update-biography'],
      video_link: req.body['update-video'],
      updated_date: time.getCurrentTimestamp()
    };

    // Update the user account
    req.session.avatar = account.avatar;
    await accountService.updateAccount(account, req.session.email);
  } else {

    // If the user did not include an avatar, just update the other fields
    const account = {
      first_name: req.body['update-firstname'],
      last_name: req.body['update-lastname'],
      biography: req.body['update-biography'],
      video_link: req.body['update-video'],
      updated_date: time.getCurrentTimestamp()
    };
    
    // Update the user account
    await accountService.updateAccount(account, req.session.email);
  }

  // Create a new session object
  const session = {
    email: req.session.email,
    verified: req.session.verified,
    avatar: req.session.avatar,
    roles: req.session.roles
  };
  
  // Configure cookie options
  const options = {
    httpOnly: true,
    secure: true,
    samesite: true,
  };
  
  // Create a new session token
  const token = jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '2h' });
  
  return res.status(200).cookie('makerSession', token, options).json({
    success: true,
    response: 'Your account was successfully updated',
  });
}

/*************************************************************************************************/
/* Update a users profile (admin action)
/*************************************************************************************************/
const updateProfileAdmin = async (req, res) => {
  // If a non-administrator visits the page, kick them out
  if (!req.session.roles.includes('admin')) {
    return res.status(403).json({
        uccess: false,
      error: 'Access Denied',
    });
  }

  // Only allow users with a valid session to access this endpoint
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You are not authorized to use this endpoint',
    });
  }

  // Halt if there is a problem with validating the user input
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Halt if the user tries to upload a bad file
  if (req.isBadFiletype) {
    return res.status(422).json({
      success: false,
      error: 'You have tried to upload an invalid image',
    });
  }

  // Get account information by ID
  const accountInfo = await accountService.getAccountByID(req.body['account-id']);

  // Check if the user supplied a valid avatar image
  if (req.file) {

    // if the user supplied an avatar, include it in the update
    const account = {
      first_name: req.body['update-firstname'],
      last_name: req.body['update-lastname'],
      avatar: `/images/avatar_images/${req.file.filename}`,
      biography: req.body['update-biography'],
      video_link: req.body['update-video'],
      updated_date: time.getCurrentTimestamp()
    };

    // Update the user account
    req.session.avatar = account.avatar;
    await accountService.updateAccount(account, accountInfo.email);
  } else {

    // If the user did not include an avatar, just update the other fields
    const account = {
      first_name: req.body['update-firstname'],
      last_name: req.body['update-lastname'],
      biography: req.body['update-biography'],
      video_link: req.body['update-video'],
      updated_date: time.getCurrentTimestamp()
    };
    
    // Update the user account
    await accountService.updateAccount(account, accountInfo.email);
  }

  return res.status(200).json({
    success: true,
    response: 'Successfully updated user profile',
  });
}

/*************************************************************************************************/
/* Verify account
/*************************************************************************************************/
const verifyAccount = async (req, res) => {
  // If a non-administrator visits the page, kick them out
  if (!req.session.roles.includes('admin')) {
    return res.status(403).json({
      success: false,
      error: 'Access Denied',
    });
  }

  // Get account by ID
  const account = await accountService.getAccountByID(req.body.data.id);

  // Verify account
  await accountService.updateAccount({account_verified: 1}, account.email)

  return res.status(200).json({
    success: true,
    response: 'Account was successfully verified',
  });
}

/*************************************************************************************************/
/* Feature account
/*************************************************************************************************/
const featureAccount = async (req, res) => {
  // If a non-administrator visits the page, kick them out
  if (!req.session.roles.includes('admin')) {
    return res.status(403).json({
      success: false,
      error: 'Access Denied',
    });
  }

  // Get account by ID
  const account = await accountService.getAccountByID(req.body.data.id);

  // Only feature verified accounts
  if (Number(account.account_verified) != 1) {
    return res.status(403).json({
      success: false,
      error: 'You may not feature an unverified account',
    });
  }

  // Verify account
  await accountService.updateAccount({account_featured: 1}, account.email)

  return res.status(200).json({
    success: true,
    response: 'Account was successfully featured',
  });
}

/*************************************************************************************************/
/* Unfeature account
/*************************************************************************************************/
const unfeatureAccount = async (req, res) => {
  // If a non-administrator visits the page, kick them out
  if (!req.session.roles.includes('admin')) {
    return res.status(403).json({
      success: false,
      error: 'Access Denied',
    });
  }

  // Get account by ID
  const account = await accountService.getAccountByID(req.body.data.id);

  // Verify account
  await accountService.updateAccount({account_featured: 0}, account.email)

  return res.status(200).json({
    success: true,
    response: 'Account was successfully unfeatured',
  });
}

/*************************************************************************************************/
/* Ban account
/*************************************************************************************************/
const banAccount = async (req, res) => {
  // If a non-administrator visits the page, kick them out
  if (!req.session.roles.includes('admin')) {
    return res.status(403).json({
      success: false,
      error: 'Access Denied',
    });
  }

  // Get account by ID
  const account = await accountService.getAccountByID(req.body.data.id);

  // Create a new role object
  const role = {
    role: 'banned',
    issuer: req.session.email,
    account_email: account.email,
  };

  // Ban account
  await roleController.createRole(role);

  return res.status(200).json({
    success: true,
    response: 'Account was successfully banned',
  });
}

/*************************************************************************************************/
/* Remove ban from account
/*************************************************************************************************/
const unbanAccount = async (req, res) => {
  // If a non-administrator visits the page, kick them out
  if (!req.session.roles.includes('admin')) {
    return res.status(403).json({
      success: false,
      error: 'Access Denied',
    });
  }

  // Get account by ID
  const account = await accountService.getAccountByID(req.body.data.id);

  // Ban account
  const banID = await roleController.getRoleID("banned", account.email);
  await roleController.deleteRoleByID(banID[0].id)

  return res.status(200).json({
    success: true,
    response: 'Account was successfully unbanned',
  });
}

module.exports = {
  getAccountByEmail,
  getAccountByID,
  getVerifiedAccounts,
  getFeaturedAccounts,
  getAccounts,
  getVerifiedAccountCount,
  getAccountCount,
  registerAccount,
  loginAccount,
  updateAccount,
  updateProfileAdmin,
  verifyAccount,
  featureAccount,
  unfeatureAccount,
  banAccount,
  unbanAccount
}