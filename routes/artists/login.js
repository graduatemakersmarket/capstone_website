/*
Author: Capstone Spring 2023
Description: Maker Market account login page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")

// Import router middleware
const router = express.Router()

// Handle account login requests
router.get("/", (request, response) => {
    return response
    .status(200)
    .render("artists/login",)
})

// Export route middleware so it can be used in other components
module.exports = router