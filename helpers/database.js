// Documentation: https://www.npmjs.com/package/mysql2
const mysql = require("mysql2/promise")

// Create a new pool for database operations
const pool = mysql.createPool({
    connectionLimit: 10,
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 60000,
    host: process.env.DB_HOST, // Pulled from the .env file
    database: process.env.DB_NAME, // Pulled from the .env file
    user: process.env.DB_USER, // Pulled from the .env file
    password: process.env.DB_PASS, // pulled from .env file
    queueLimit: 0

})

// Export the pool so we can import it into other files for use
module.exports = pool