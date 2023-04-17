/*
Author: Capstone Spring 2023
Description: Maker Market artist page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const db = require("../../helpers/database")

// Import required database queries
const { getAccountInfo } = require("../../helpers/sql")

// Import router middleware
const router = express.Router()

// Handle artist requests
router.get("/", async (request, response) => {
    
    // Grab all artists from the database
    const artists = await db.query(getAccountInfo)

    return response
    .status(200)
    .render("artists/artists", {profiles: artists[0]})
})

// Export route middleware so it can be used in other components
module.exports = router