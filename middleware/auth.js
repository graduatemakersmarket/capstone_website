const jwt = require('jsonwebtoken');

/*************************************************************************************************/
/* Restrict page access to administrators
/*************************************************************************************************/
const adminAccess = async (req, res, next) => {
  let token = null;

  // If the user does not have an active session, kick them to the login page
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.redirect('/account/login');
  }

  // Grab session token from session cookie (if present)
  if (req.cookies.makerSession) {
    token = req.cookies.makerSession;
  }

  // Grab session token from authorization header (if present)
  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  // If no token could be found, kick them to the login page
  if (!token) {
    return res.redirect('/account/login');
  }

  // Verify the session token
  jwt.verify(token, process.env.SESSION_SECRET, (error, decoded) => {
    if (error) {
      return res.clearCookie('makerSession').redirect('/account/login'); // Destroy invalid or expired session!
    }

    // If a non-administrator visits the page, kick them out
    if (!decoded.roles.includes('admin')) {
      return res.redirect('/error/unauthorized');
    }

    // Create a new session object that can be referenced across the website
    req.session = { email: decoded.email, verified: decoded.verified, avatar: decoded.avatar, roles: decoded.roles };

    return next();
  });

  return false;
};

/*************************************************************************************************/
/* Restrict page access to members with active sessions
/*************************************************************************************************/
const memberAccess = async (req, res, next) => {
  let token = null;

  // If the user does not have an active session, kick them to the login page
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.redirect('/account/login');
  }

  // Grab session token from session cookie (if present)
  if (req.cookies.makerSession) {
    token = req.cookies.makerSession;
  }

  // Grab session token from authorization header (if present)
  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  // If no token could be found, kick them to the login page
  if (!token) {
    return res.redirect('/account/login');
  }

  // Verify the session token
  jwt.verify(token, process.env.SESSION_SECRET, (error, decoded) => {
    if (error) {
      return res.clearCookie('makerSession').redirect('/account/login'); // Destroy invalid or expired session!
    }

    // Create a new session object that can be referenced across the website
    req.session = { email: decoded.email, verified: decoded.verified, avatar: decoded.avatar, roles: decoded.roles };

    return next();
  });

  return false;
};

/*************************************************************************************************/
/* Restrict endpoint access to members with active sessions
/*************************************************************************************************/
const authenticatedAPI = async (req, res, next) => {
  let token = null;

  // If the user does not have an active session, ignore their requests
  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You do not have sufficient priviledges to access this endpoint',
    });
  }

  // Grab session token from session cookie (if present)
  if (req.cookies.makerSession) {
    token = req.cookies.makerSession;
  }

  // Grab session token from authorization header (if present)
  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  // If no token could be found, ignore the request
  if (!token) {
    return res.status(403).json({
      success: false,
      error: 'You do not have sufficient priviledges to access this endpoint',
    });
  }

  // Verify the session token
  jwt.verify(token, process.env.SESSION_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        success: false,
        error: 'You do not have sufficient priviledges to access this endpoint', // Drop invalid or expired session!
      });
    }

    // Create a new session object that can be referenced across the website
    req.session = { email: decoded.email, verified: decoded.verified, avatar: decoded.avatar, roles: decoded.roles };

    return next();
  });

  return false;
};

/*************************************************************************************************/
/* Allow both authenticated and unauthenticated requests
/*************************************************************************************************/
const guestAccess = async (req, res, next) => {
  let token = null;

  // If the user does not have an active session, just give them a guest session to make frontend work easier
  if (!req.cookies.makerSession && !req.headers.authorization) {
    req.session = {email: 'guest@guest.invalid', verified: 0, avatar: '/avatar_images/default.png', roles: ['guest']};

    return next();
  }

  // Grab session token from session cookie (if present)
  if (req.cookies.makerSession) {
    token = req.cookies.makerSession;
  }

  // Grab session token from authorization header (if present)
  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  // If no token could be found, kick them to the login page
  if (!token) {
    return res.redirect('/account/login');
  }

  // Verify the session token
  jwt.verify(token, process.env.SESSION_SECRET, async (error, decoded) => {
    if (error) { // If the user's session dies, just give them a new guest session and redirect them to the login page
      req.session = {email: 'guest@guest.invalid', verified: 0, avatar: '/avatar_images/default.png', roles: ['guest']};
      return res.clearCookie('makerSession').redirect('/account/login');
    }

    // Create a new session object that can be referenced across the website
    req.session = req.session = { email: decoded.email, verified: decoded.verified, avatar: decoded.avatar, roles: decoded.roles };

    return next();
  });

  return false;
};

module.exports = {
  adminAccess,
  memberAccess,
  authenticatedAPI,
  guestAccess
};
