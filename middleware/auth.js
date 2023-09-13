const jwt = require('jsonwebtoken');
const encode = require('../utils/encode');
const accountService = require('../services/accountService');

const memberAccess = async (req, res, next) => {
  let token = null;

  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.redirect('/account/login');
  }

  if (req.cookies.makerSession) {
    token = req.cookies.makerSession;
  }

  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return res.redirect('/account/login');
  }

  await jwt.verify(token, process.env.SESSION_SECRET, async (error, decoded) => {
    if (error) {
      return res.clearCookie('makerSession').redirect('/account/login');
    }

    const account = await accountService.getAccountInfoByEmail(decoded.makerEmail);

    const session = {
      makerEmail: decoded.makerEmail,
      makerVerified: decoded.makerVerified,
      makerAvatar: account.avatar,
    };

    req.session = session;

    return next();
  });

  return false;
};

const authenticatedAPI = async (req, res, next) => {
  let token = null;

  if (!req.cookies.makerSession && !req.headers.authorization) {
    return res.status(403).json({
      success: false,
      error: 'You do not have sufficient priviledges to access this endpoint',
    });
  }

  if (req.cookies.makerSession) {
    token = req.cookies.makerSession;
  }

  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return res.status(403).json({
      success: false,
      error: 'You do not have sufficient priviledges to access this endpoint',
    });
  }

  await jwt.verify(token, process.env.SESSION_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(403).json({
        success: false,
        error: 'You do not have sufficient priviledges to access this endpoint',
      });
    }

    const session = {
      makerEmail: decoded.makerEmail,
      makerVerified: decoded.makerVerified,
    };

    req.session = session;

    return next();
  });

  return false;
};

const guestAccess = async (req, res, next) => {
  let token = null;

  if (!req.cookies.makerSession && !req.headers.authorization) {
    const session = {
      makerEmail: 'guest@makermarket.local',
      makerVerified: 0,
      makerAvatar: '/avatar_images/default.png',
    };

    req.session = session;

    return next();
  }

  if (req.cookies.makerSession) {
    token = req.cookies.makerSession;
  }

  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return res.redirect('/account/login');
  }

  await jwt.verify(token, process.env.SESSION_SECRET, async (error, decoded) => {
    if (error) {
      const session = {
        makerEmail: 'guest@makermarket.local',
        makerVerified: 0,
        makerAvatar: '/avatar_images/default.png',
      };

      req.session = session;

      return res.clearCookie('makerSession').redirect('/account/login');
    }

    const account = await accountService.getAccountInfoByEmail(decoded.makerEmail);

    const session = {
      makerEmail: decoded.makerEmail,
      makerVerified: decoded.makerVerified,
      makerAvatar: account.avatar,
    };

    req.session = session;

    return next();
  });

  return false;
};

module.exports = {
  memberAccess,
  authenticatedAPI,
  guestAccess,
};
