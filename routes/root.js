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
/* Render the GSMM application page
/*************************************************************************************************/
router.get('/application', auth.guestAccess, (req, res) => res.render('application', {
  session: req.session,
}));

/*************************************************************************************************/
/* Render the GSMM application terms
/*************************************************************************************************/
router.get('/application/terms', auth.guestAccess, (req, res) => res.render('legal/generalGuidelines', {
  session: req.session,
}));

/*************************************************************************************************/
/* Render the unauthorized error page
/*************************************************************************************************/
router.get('/error/unauthorized', auth.guestAccess, (req, res) => res.render('errors/unauthorized', {
  session: req.session,
}));

module.exports = router;
