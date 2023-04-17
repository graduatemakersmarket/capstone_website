/*
Author: Capstone Spring 2023
Description: Maker Market artist profile page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const db = require("../../helpers/database")

// Import required database queries
const { getAccountProfile } = require("../../helpers/sql")

// Import router middleware
const router = express.Router()

// Handle artist profile requests
router.get("/:artist", async (request, response) => {

    // Grab all artists from the database
    const artistInfo = await db.query(getAccountProfile, [request.params.artist])

    return response
    .status(200)
    .render("artists/profile", {profile: artistInfo[0][0]})
})

// Export route middleware so it can be used in other components
module.exports = router