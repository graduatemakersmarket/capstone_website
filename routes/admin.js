/*
Author: Capstone Spring 2023
Description: Maker Market admin panel controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const db = require("../helpers/database")

// Import required database queries
const { getAccountInfo } = require("../helpers/sql")

// Import the custom protectAPI middleware
const { protectWebPage } = require("../helpers/sessions")

// Import router middleware
const router = express.Router()

// Handle admin panel requests
router.get("/", protectWebPage, async (request, response) => {

    // Reject non-admins
    if (request.is_admin === 0){
        return response
        .render("errors/unauthorized")
    }

    // Grab all artists from the database
    const artists = await db.query(getAccountInfo)

    return response
    .status(200)
    .render("admin", {profiles: artists[0]})
})

// Export route middleware so it can be used in other components
module.exports = router