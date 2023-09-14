const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

/*************************************************************************************************/
/* Render the homepage
/*************************************************************************************************/
router.get('/', auth.guestAccess, (req, res) => res.render('index', {
  session: req.session,
}));

/*************************************************************************************************/
/* Render the unauthorized error page
/*************************************************************************************************/
router.get('/error/unauthorized', auth.guestAccess, (req, res) => res.render('errors/unauthorized', {
  session: req.session,
}));

module.exports = router;
