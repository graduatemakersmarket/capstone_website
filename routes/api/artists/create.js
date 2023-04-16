/*
Author: Capstone Spring 2023
Description: API for creating new user accounts
Documentation: N/A
*/

// Import the required middleware
const fs = require("fs")
const path = require("path")
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../../../helpers/database")

// Open the default profile picture and convert it to BASE64
const defaultAvatar = fs.readFileSync(
    path.resolve(__dirname, "../../../resources/images/profile.png"), 
    "base64"
    )

// Import required database queries
const { checkAccountExists } = require("../../../helpers/sql")
const { createAccount } = require("../../../helpers/sql")

// Import validators
const { createAccountValidation } = require("../../../helpers/validation")
const { validationResult } = require("express-validator")

// Import router middleware
const router = express.Router()

// Create new user account
router.post("/", createAccountValidation, async (request, response) => {
    // Validate the incoming form fields
    if (!validationResult(request).isEmpty()){
        return response
        .status(400) // Bad request
        .json({success: false, error: validationResult(request).errors[0].msg})
    }

    // Grab data from the incoming form fields
    const artist = request.body.username.toLowerCase()
    const email = request.body.email.toLowerCase()
    const passwordHash = await bcrypt.hash(request.body.password, 12)

    // Grab user and email count from the database
    const accountCheck = await db.query(checkAccountExists, [artist, email])

    // Check if username is already in use
    if (Number(accountCheck[0][0].userCount) > 0){
        return response
        .status(400) // Bad request
        .json({success: false, error: `${artist} is already in use`})
    }

    // Check if email address is already in use
    if (Number(accountCheck[0][0].emailCount) > 0){
        return response
        .status(400)
        .json({success: false, error: `${email} is already in use`})
    }

    // Create the new account
    await db.query(createAccount, [artist, email, passwordHash, defaultAvatar])

    /*
    The next bit of code will create a new cryptographically signed
    session token. The information inside of the token can be read by anyone,
    but the server will only accept modifications to the session data if you
    have the secret key. So, while it is safe to store information like if a
    particular user is an administrator, their username, etc. You should NEVER
    store any private or sensitive information in this token. 
    */
    const authToken = jwt.sign(
        {"artist_name": artist, "is_admin": 0}, // Session data
        process.env.AUTH_TOKEN_SECRET, // Pulled from .env file
        {expiresIn: "1h"} // Session is only valid for 1 hour
    )

    // Save the session in a secure, HTTP-ONLY cookie
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        samesite: true
    }

    return response
    .status(201) // New resource successfully created
    .cookie("MakerMarket", authToken, cookieOptions) // Session Cookie
    .json({success: true, response: `${artist} successfully created`})
})

// Reject GET requests
router.get("/", async (request, response) => {
    return response
    .status(400) // Bad Response
    .json({success: false, error: "This endpoint does not support GET requests"})
})

// Export route middleware so it can be used in other components
module.exports = router