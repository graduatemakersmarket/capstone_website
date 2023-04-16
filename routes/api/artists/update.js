// Import required components
const express = require("express")
const jwt = require("jsonwebtoken")
const multer  = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const db = require("../../../helpers/database")

// Import required database queries
const { updateAccountInfo } = require("../../../helpers/sql")
const { getAccountInfo } = require("../../../helpers/sql")

// Import session handler
const { protectAPI } = require("../../../helpers/sessions")

// Import routing
const router = express.Router()

router.post("/", protectAPI, upload.single("avatar"), async (request, response) => {
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
            instagram,
            facebook,
            twitter,
            website,
            biography,
            artist
        ]

    }

    // Use the current profile picture if one is not supplied
    if (!request.file){
        const accountInfo = await db.query(getAccountInfo, [artist])
        artistProfile = [
            firstname,
            lastname,
            accountInfo[0][0].avatar,
            instagram,
            facebook,
            twitter,
            website,
            biography,
            artist
        ]
    }

    // Update the account information
    await db.query(updateAccountInfo, artistProfile)

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