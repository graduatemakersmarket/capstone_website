const roleService = require('../services/roleService');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const createRole = async (role) => roleService.createRole(role);
const deleteRoleByID = async (id) => roleService.deleteRole(id);
const getRolesByEmail = async (account_email) => (await roleService.getRolesByEmail(account_email)).map((role) => role.role);
const getRoleID = async (role_name, account_email) => roleService.getRoleID(role_name, account_email);

module.exports = {
    createRole,
    deleteRoleByID,
    getRolesByEmail,
    getRoleID
  }