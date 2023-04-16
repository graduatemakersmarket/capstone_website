/*
Author: Capstone Spring 2023
Description: Handle session validation
Documentation: https://www.npmjs.com/package/jsonwebtoken,
*/

// Import the the JsonWebToken middleware
const jwt = require("jsonwebtoken")

// Require a valid session to access protected pages
const protectWebPage = async (request, response, next) => {
    // Redirect unauthenticated users to the login page
    if (!request.cookies.MakerMarket){
        return response
        .redirect("/artists/login")
    }

    // Grab the token and secret
    const authToken = request.cookies.MakerMarket
    const authSecret = process.env.AUTH_TOKEN_SECRET
    
    // Verify the cryptographic token
    jwt.verify(authToken, authSecret, (error, decoded) => {
        // Redirect to the login page if the session is invalid
        if (error){
            return response
            .clearCookie("MakerMarket")
            .redirect("/artists/login")
        }

        // Save the session data
        request.artist_name = decoded.artist_name
        request.is_admin = decoded.is_admin
        next()
    })
}

// Require a valid session to access protected API endpoints
const protectEndpoint = async (request, response, next) => {
    // Redirect unauthenticated users to the login page
    if (!request.cookies.MakerMarket){
        return response
        .status(403) // Failed Authentication
        .json({success: false, error: "You must authenticate to use this API"})
    }

    // Grab the token and secret
    const authToken = request.cookies.MakerMarket
    const authSecret = process.env.AUTH_TOKEN_SECRET
    
    // Verify the cryptographic token
    jwt.verify(authToken, authSecret, (error, decoded) => {
        // Redirect to the login page if the session is invalid
        if (error){
            return response
            .clearCookie("MakerMarket")
            .status(403) // Failed Authentication
            .json({success: false, error: "You must authenticate to use this API"})
        }

        // Save the session data
        request.artist_name = decoded.artist_name
        request.is_admin = decoded.is_admin
        next()
    })
}

// Detect if a user is a guest or has a session
const allowGuests = async (request, response, next) => {
    // Assume the visitor is a guest until the session is verified
    request.artist_name = "guest"
    request.is_admin = 0

    // Check if session exists
    if (request.cookies.MakerMarket) {
        // Grab the token and secret
        const authToken = request.cookies.MakerMarket
        const authSecret = process.env.AUTH_TOKEN_SECRET

        // Verify the cryptographic token
        jwt.verify(authToken, authSecret, (error, decoded) => {
            // Redirect to the login page if the session is invalid
            if (error){
                // Default to a guest session if there is an error
                request.artist_name = "guest"
                request.is_admin = 0
                return response
                .clearCookie("MakerMarket")
            }

            // Save the session data
            request.artist_name = decoded.artist_name
            request.is_admin = decoded.is_admin
        })
    }

    // Pass control back to the caller
    next()
}

// Export middleware so it can be imported in other components
module.exports = {
    protectWebPage,
    protectEndpoint,
    allowGuests
}