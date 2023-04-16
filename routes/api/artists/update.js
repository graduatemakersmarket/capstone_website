// Import required components
const express = require("express")
const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")
const multer  = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const db = require("../../../helpers/database")


// Import required database queries
const { updateAccountSettingsAvatar } = require("../../../helpers/sql")
const { updateAccountSettingsNoAvatar } = require("../../../helpers/sql")

// Import validation components
const { accountUpdateValidation } = require("../../../helpers/validation")
const { validationResult } = require("express-validator")

// Import routing
const router = express.Router()

router.post("/", accountUpdateValidation, upload.single("avatar"), async (request, response) => {
    // Require a valid session to access the API
    if (!request.cookies.MakerMarket){
        return response
        .status(403) // Authentication failed
        .json({success: false, error: "You are not authorized to use this API"})
    }

    // Verify the session's cryptographic signature
    const authToken = request.cookies.MakerMarket
    const authSecret = process.env.AUTH_TOKEN_SECRET
    const decodedData = jwt.verify(authToken, authSecret)

    // Check if the verification failed
    if (!decodedData){
        return response
        .status(403) // Authentication failed
        .json({success: false, error: "You are not authorized to use this API"})
    }

    // Grab the artist name from the authenticated session
    request.artist = decodedData.artist_name

    // Grab data from the incoming form fields
    const firstname = request.body.firstname.toLowerCase()
    const lastname = request.body.lastname.toLowerCase()
    const instagram = request.body.instagram.toLowerCase()
    const facebook = request.body.facebook.toLowerCase()
    const twitter = request.body.twitter.toLowerCase()
    const website = request.body.website.toLowerCase()
    const biography = request.body.biography.toLowerCase()
    
    // Save settings with the avatar included
    if (request.file){
        const avatar = request.file.buffer.toString("base64")

        // Pack settings
        artistSettings = [
            firstname,
            lastname,
            avatar,
            instagram,
            facebook,
            twitter,
            website,
            biography,
            request.artist
        ]
        
        // Update settings
        await db.query(updateAccountSettingsAvatar, artistSettings)
    }

    // Save settings without an avatar
    if (!request.file){
        // Pack settings
        artistSettings = [
            firstname,
            lastname,
            instagram,
            facebook,
            twitter,
            website,
            biography,
            request.artist
        ]
        
        // Update settings
        await db.query(updateAccountSettingsNoAvatar, artistSettings)
    }

    return response
    .json({success: true, response: "Settings successfully updated"})

})

router.get("/", async (request, response) => {
    return response
    .status(400) // Bad Response
    .json({success: false, error: "This endpoint does not support GET requests"})
})

// Export routing
module.exports = router