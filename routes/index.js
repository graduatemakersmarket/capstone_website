/*
Author: Capstone Spring 2023
Description: Maker Market root page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")

// Import the custom protectAPI middleware
const { allowGuests } = require("../helpers/sessions")

// Import router middleware
const router = express.Router()

// Handle main page requests
router.get("/", allowGuests, async (request, response) => {

    return response
    .status(200)
    .render("index")
})

// Export route middleware so it can be used in other components
module.exports = router