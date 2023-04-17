/*
Author: Capstone Spring 2023
Description: Maker Market account update page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const router = express.Router()
const fs = require("fs")
const db = require("../../helpers/database")

// Import required database queries
const { getAccountProfile} = require("../../helpers/sql")

// Import session handler
const { protectWebPage } = require("../../helpers/sessions")

// Handle account update requests
router.get("/", protectWebPage, async (request, response) => {

    // Grab the artist name from the request
    const artist = request.artist_name

    // Grab account settings from the database
    const artistInfo = await db.query(getAccountProfile, [artist])

    return response
    .status(200)
    .render("artists/update", {profile: artistInfo[0][0], username: artist})
})

// Export route middleware so it can be used in other components
module.exports = router