const jwt = require('jsonwebtoken');
const time = require('../utils/time');
const controller = require('../controllers/accountController');

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

    const profile = await controller.getBasicProfile(decoded.vpUsername);

    const session = {
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpAvatar: profile.avatar,
      vpIP: decoded.vpIP,
    };

    const refresh = {
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpIP: decoded.vpIP,
    };

    req.session = session;

    if (time.getDifferenceMinutes(decoded.exp) < 30 && req.cookies.makerSession) {
      const extend = await jwt.sign(refresh, process.env.SESSION_SECRET, { expiresIn: '2h' });
      res.cookie('makerSession', extend, { httpOnly: true, secure: true, samesite: true });
    }

    return next();
  });

  return false;
};

const APIAccess = async (req, res, next) => {
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

    const refresh = {
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpIP: decoded.vpIP,
    };

    req.session = session;

    if (time.getDifferenceMinutes(decoded.exp) < 30 && req.cookies.makerSession) {
      const extend = await jwt.sign(refresh, process.env.SESSION_SECRET, { expiresIn: '2h' });
      res.cookie('makerSession', extend, { httpOnly: true, secure: true, samesite: true });
    }

    return next();
  });

  return false;
};

const guestAccess = async (req, res, next) => {
  let token = null;

  if (!req.cookies.makerSession && !req.headers.authorization) {
    const session = {
      vpUsername: 'guest',
      vpEmail: 'guest@vpchat.net',
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
        vpEmail: 'guest@vpchat.net',
        vpIP: req.headers['x-real-ip'] || req.socket.remoteAddress,
      };

      req.session = session;

      return res.clearCookie('makerSession').redirect('/account/login');
    }

    const profile = await controller.getBasicProfile(decoded.vpUsername);

    const session = {
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpAvatar: profile.avatar,
      vpIP: decoded.vpIP,
    };

    const refresh = {
      vpUsername: decoded.vpUsername,
      vpEmail: decoded.vpEmail,
      vpIP: decoded.vpIP,
    };

    req.session = session;

    if (time.getDifferenceMinutes(decoded.exp) < 30 && req.cookies.makerSession) {
      const extend = await jwt.sign(refresh, process.env.SESSION_SECRET, { expiresIn: '2h' });
      res.cookie('makerSession', extend, { httpOnly: true, secure: true, samesite: true });
    }

    return next();
  });

  return false;
};

module.exports = {
  memberAccess,
  APIAccess,
  guestAccess,
};
