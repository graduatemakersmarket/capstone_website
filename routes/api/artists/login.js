// Import required components
const express = require("express")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const db = require("../../../helpers/database")

// Import required database queries
const { checkAccountDetails } = require("../../../helpers/sql")

// Import validation components
const { accountLoginValidation } = require("../../../helpers/validation")
const { validationResult } = require("express-validator")

// Import routing
const router = express.Router()

router.post("/", accountLoginValidation, async (request, response) => {
    // Check for an existing session
    if (request.cookies.MakerMarket){
        return response
        .status(400)
        .json({success: false, error: "You may only have one active session"})
    }

    // Validate the incoming form fields
    if (!validationResult(request).isEmpty()){
        return response
        .status(400) // Bad request
        .json({success: false, error: validationResult(request).errors[0].msg})
    }

    // Grab data from the incoming form fields
    const artist = request.body.username.toLowerCase()
    const password = request.body.password

    // Check account credentials
    const credCheck = await db.query(checkAccountDetails, [artist])

    // Account does not exist
    if (credCheck[0].length === 0){
        return response
        .status(401) // Failed authentication
        .json({success: false, error: "Incorrect username or password"})
    }

    // Compare the password hashes
    const passwordHash = credCheck[0][0].password_hash
    const hashCheck = await bcrypt.compare(password, passwordHash)

    // Check if the hash comparison failed
    if (!hashCheck){
        return response
        .status(401) // Failed authentication 
        .json({success: false, error: "Incorrect username or password"})
    }

    // Grab admin status from the database
    const adminStatus = Number(credCheck[0][0].is_admin)

    /*
    The next bit of code will create a new cryptographically signed
    session token. The information inside of the token can be read by anyone,
    but the server will only accept modifications to the session data if you
    have the secret key. So, while it is safe to store information like if a
    particular user is an administrator, their username, etc. You should NEVER
    store any private or sensitive information in this token. 
    */
    const authToken = jwt.sign(
        {"artist_name": artist, "is_admin": adminStatus}, // Session data
        process.env.AUTH_TOKEN_SECRET, // Pulled from .env file
        {expiresIn: "1h"} // Session is only valid for 1 hour
    )

    // Save the session in a HTTP-ONLY cookie
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        samesite: true
    }

    return response
    .cookie("MakerMarket", authToken, cookieOptions)
    .json({success: true, response: "Session successfully created"})
})

router.get("/", async (request, response) => {
    return response
    .status(400) // Bad Response
    .json({success: false, error: "This endpoint does not support GET requests"})
})

// Export routing
module.exports = router