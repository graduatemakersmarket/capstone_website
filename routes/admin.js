const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

/*************************************************************************************************/
/* Render the admin panel page
/*************************************************************************************************/
router.get('/', auth.adminAccess, (req, res) => res.render('admin/admin', {
  session: req.session,
}));

/*************************************************************************************************/
/* Render the page that will allow admins to edit a user's account
/*************************************************************************************************/
router.get('/edit', auth.adminAccess, (req, res) => res.render('admin/edit', {
  session: req.session,
}));

module.exports = router;