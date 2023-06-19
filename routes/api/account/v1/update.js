/*
Author: Capstone Spring 2023
Description: API for updating account profiles
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const multer  = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const db = require("../../../helpers/database")

// Import required database queries
const { updateAccountProfile } = require("../../../helpers/sql")
const { getAccountProfile } = require("../../../helpers/sql")

// Import validators
const { accountUpdateValidation } = require("../../../helpers/validation")
const { validationResult } = require("express-validator")

// Import the custom protectAPI middleware
const { protectEndpoint } = require("../../../helpers/sessions")

// Import router middleware
const router = express.Router()

// Update account profile
router.post("/", protectEndpoint, upload.single("avatar"), accountUpdateValidation, async (request, response) => {
    // Validate the incoming form fields
    if (!validationResult(request).isEmpty()){
        return response
        .status(400) // Bad request
        .json({success: false, error: validationResult(request).errors[0].msg})
    }

    // Create an empty list to store profile information
    var artistProfile = []

    // Grab the artist name from the authenticated session
    const artist = request.artist_name

    // Grab data from the incoming form fields
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const instagram = request.body.instagram
    const facebook = request.body.facebook
    const twitter = request.body.twitter
    const website = request.body.website
    const biography = request.body.biography

    // Update the profile picture if one is supplied
    if (request.file){
        artistProfile = [
            firstname,
            lastname,
            request.file.buffer.toString("base64"),
            facebook,
            instagram,
            twitter,
            website,
            biography,
            artist
        ]

    }

    // Use the current profile picture if one is not supplied
    if (!request.file){
        const accountInfo = await db.query(getAccountProfile, [artist])
        artistProfile = [
            firstname,
            lastname,
            accountInfo[0][0].avatar,
            facebook,
            instagram,
            twitter,
            website,
            biography,
            artist
        ]
    }

    // Update the account information
    await db.query(updateAccountProfile, artistProfile)

    return response
    .json({success: true, response: "Settings successfully updated"})

})

// Reject GET requests
router.get("/", async (request, response) => {
    return response
    .status(400) // Bad Response
    .json({success: false, error: "This endpoint does not support GET requests"})
})

// Export route middleware so it can be used in other components
module.exports = router