const roleService = require('../services/roleService');

/*************************************************************************************************/
/* Helper Methods
/*************************************************************************************************/
const createRole = async (role) => roleService.createRole(role);
const getRolesByEmail = async (account_email) => (await roleService.getRoles(account_email)).map((role) => role.role);

module.exports = {
    createRole,
    getRolesByEmail
  }