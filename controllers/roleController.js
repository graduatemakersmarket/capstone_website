const roleService = require('../services/roleService');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const createRole = async (role) => roleService.createRole(role);
const getRolesByEmail = async (account_email) => (await roleService.getRolesByEmail(account_email)).map((role) => role.role);

module.exports = {
    createRole,
    getRolesByEmail
  }