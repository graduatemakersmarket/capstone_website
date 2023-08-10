const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountService = require('../services/accountService')
const roleService = require('../services/roleService')
const validator = require('express-validator');
const encode = require('../utils/encode');

const registerAccount = async (req, res) => {
  // Gracefully fail if form validation fails
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Check if session cookie exists
  if (req.cookies.makerSession) {
    return res.status(403).json({
      success: false,
      error: 'You already have an active user session',
    });
  }

  // Check if authorization header exists
  if (req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You already have an active user session',
    });
  }

  // Check if account exists
  if (await accountService.getAccountInfo(req.body['register-email'])) {
    return res.status(403).json({
      success: false,
      error: `The email address ${req.body['register-email']} is already in use`,
    });
  }

  // Create a new account object
  const account = {
    email: req.body['register-email'],
    password: await bcrypt.hash(req.body['register-password'], 12),
    first_name: req.body['register-firstname'],
    last_name: req.body['register-lastname'],
    avatar: await encode.imageToBase64('../resources/images/profile.png'),
  };

  // Create a new role object
  const role = {
    role: 'maker',
    issuer: 'system',
    account_email: account.email,
  };

  // Create the new account
  await accountService.createAccount(account);
  await roleService.createRole(role);

  // Create a new session object
  const session = {
    makerEmail: account.email,
    makerVerified: 0,
  };
  
  // Configure cookie options
  const options = {
    httpOnly: true,
    secure: true,
    samesite: true,
  };
  
  // Create a new web token for the session
  const token = await jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '2h' });
  
  return res.status(201).cookie('makerSession', token, options).json({
    success: true,
    response: `Your account ${account.email} has been successfully created`,
  })
}

const loginAccount = async (req, res) => {
  // Gracefully fail if form validation fails
  if (!validator.validationResult(req).isEmpty()) {
    return res.status(422).json({
      success: false,
      error: validator.validationResult(req).errors[0].msg,
    });
  }

  // Check if session cookie exists
  if (req.cookies.makerSession) {
    return res.status(403).json({
      success: false,
      error: 'You already have an active user session',
    });
  }

  // Check if authorization header exists
  if (req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You already have an active user session',
    });
  }

  // Look up the account by email address
  const accountInfo = await accountService.getAccountInfo(req.body['login-email'])

  // Check if the account exists
  if (!accountInfo) {
    return res.status(401).json({
      success: false,
      error: 'Bad username or password',
    });
  }

  // Check if the account has been flagged for a forced password change
  if (Number(accountInfo.change_password)) {
    return res.status(403).json({
      success: false,
      error: 'You must change your password using the account recovery service to proceed',
    });
  }

  // Check the account password against the supplied password
  if (!await bcrypt.compare(req.body['login-password'], accountInfo.password)) {
    return res.status(401).json({
      success: false,
      error: 'Bad username or password',
    });
  }

  // Grab the roles associated with account
  const roles = (await roleService.getRoles(accountInfo.email)).map((role) => role.role);

  // Check if the account is banned or reserved
  if (roles.includes('banned') || roles.includes('reserved')) {
    return res.status(403).json({
      success: false,
      error: 'This account has been banned for violating our terms of service',
    });
  }

  // Create a new session object
  const session = {
    makerEmail: accountInfo.email,
    makerVerified: accountInfo.account_verified,
  };

  // Configure cookie options
  const options = {
    httpOnly: true,
    secure: true,
    samesite: true,
  };

  // Create a new web token for the session
  const token = await jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '2h' });

  return res.status(201).cookie('makerSession', token, options).json({
    success: true,
    response: `A session for ${accountInfo.email} has been successfully created`,
  });
}

const updateAccount = async (req, res) => {
  // LOGIC HERE
}

module.exports = {
  registerAccount,
  loginAccount,
  updateAccount,
}