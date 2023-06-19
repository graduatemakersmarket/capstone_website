const jwt = require('jsonwebtoken');
const time = require('../utils/time');

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
      if (req.cookies.makerSession) return res.clearCookie('makerSession').redirect('/account/login');
      if (req.headers.authorization) return res.redirect('/account/login');
    }

    const profile = await controller.getProfile(decoded.makerUsername);

    const session = {
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpAvatar: profile.avatar,
      vpIP: decoded.vpIP,
    };

    // Extend session if a user is active on the website within a reasonable window
    if (time.getDifferenceMinutes(decoded.exp) <= 30 && req.cookies.makerSession) {
      const refresh = await jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '1h' });
      res.cookie('makerSession', refresh, { httpOnly: true, secure: true, samesite: true });
    }

    req.session = session;

    return true;
  });

  return next();
};

const memberAPIAccess = async (req, res, next) => {
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
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpIP: decoded.vpIP,
    };

    // Extend session if a user is active on the website within a reasonable window
    if (time.getDifferenceMinutes(decoded.exp) <= 30 && req.cookies.makerSession) {
      const refresh = await jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '1h' });
      res.cookie('makerSession', refresh, { httpOnly: true, secure: true, samesite: true });
    }

    req.session = session;

    return true;
  });

  return next();
};

const guestAccess = async (req, res, next) => {
  let token = null;

  if (!req.cookies.makerSession && !req.headers.authorization) {
    const session = {
      vpUsername: 'guest',
      vpEmail: 'guest@vplaces.online',
      vpIP: req.headers['x-real-ip'] || req.socket.remoteAddress,
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
        vpUsername: 'guest',
        vpEmail: 'guest@vplaces.online',
        vpIP: req.headers['x-real-ip'] || req.socket.remoteAddress,
      };

      req.session = session;

      if (req.cookies.makerSession) return res.clearCookie('makerSession').redirect('/account/login');
      if (req.headers.authorization) return res.redirect('/account/login');
    }

    const profile = await controller.getProfile(decoded.vpUsername);

    const session = {
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpAvatar: profile.avatar,
      vpIP: decoded.vpIP,
    };

    // Extend session if a user is active on the website within a reasonable window
    if (time.getDifferenceMinutes(decoded.exp) <= 30 && req.cookies.makerSession) {
      const refresh = await jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: '1h' });
      res.cookie('makerSession', refresh, { httpOnly: true, secure: true, samesite: true });
    }

    req.session = session;

    return true;
  });

  return next();
};

module.exports = {
  memberAccess,
  memberAPIAccess,
  guestAccess,
};
