const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth.guestAccess, (req, res) => res.render('index', {
  session: req.session,
}));

router.get('/application', auth.guestAccess, (req, res) => res.render('application', {
  session: req.session,
}));

router.get('/application/terms', auth.guestAccess, (req, res) => res.render('legal/generalGuidelines', {
  session: req.session,
}));

module.exports = router;
