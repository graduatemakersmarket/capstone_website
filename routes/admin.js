const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

/*************************************************************************************************/
/* Render the admin panel page
/*************************************************************************************************/
router.get('/', auth.adminAccess, (req, res) => res.render('admin/admin', {
  session: req.session,
}));

module.exports = router;