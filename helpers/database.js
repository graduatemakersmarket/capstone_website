/*
Author: Capstone Spring 2023
Description: Configuration for the MySQL2 client
Documentation: https://www.npmjs.com/package/mysql2
*/

// Import the MySQL middleware with support for promises
const mysql = require("mysql2/promise")

// Create a new pool for database operations with sane defaults
const pool = mysql.createPool({
    connectionLimit: 10,
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 60000,
    host: process.env.DB_HOST, // Host is stored in the .env file
    database: process.env.DB_NAME, // Name is stored in the .env file
    user: process.env.DB_USER, // User is stored in the .env file
    password: process.env.DB_PASS, // Password is stored in the .env file
    queueLimit: 0

})

// Export the pool so it can be imported into other components
module.exports = pool