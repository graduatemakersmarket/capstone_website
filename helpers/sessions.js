/*
Author: Capstone Spring 2023
Description: Handle session validation
Documentation: https://www.npmjs.com/package/jsonwebtoken,
*/

// Import the the JsonWebToken middleware
const jwt = require("jsonwebtoken")

// Require a valid session to access protected pages
const protectPage = async (request, response, next) => {

    // Check if session cookie exists
    if (!request.cookies.MakerMarket){
        return response
        .status(403)
        .render("errors/unauthorized")
    }

    // Verify the session's cryptographic signature
    const authToken = request.cookies.MakerMarket
    const authSecret = process.env.AUTH_TOKEN_SECRET
    const decodedData = jwt.verify(authToken, authSecret)

    // Check if the verification failed
    if (!decodedData){
        return response
        .status(403)
        .render("errors/unauthorized")
    }

    request.artist_name = decodedData.artist_name
    request.is_admin = decodedData.is_admin
    next()
}

// Require a valid session to access protected API endpoints
const protectAPI = async (request, response, next) => {

    // Check if session cookie exists
    if (!request.cookies.MakerMarket){
        return response
        .status(403)
        .json({success: false, error: "You are not authorized to use this API"})
    }

    // Verify the session's cryptographic signature
    const authToken = request.cookies.MakerMarket
    const authSecret = process.env.AUTH_TOKEN_SECRET
    const decodedData = jwt.verify(authToken, authSecret)

    // Check if the verification failed
    if (!decodedData){
        return response
        .status(403)
        .json({success: false, error: "You are not authorized to use this API"})
    }

    request.artist_name = decodedData.artist_name
    request.is_admin = decodedData.is_admin
    next()
}

const detectGuest = async (request, response, next) => {

    request.artist_name = "guest"
    request.is_admin = 0

    // Check if session exists
    if (request.cookies.MakerMarket){
        // Verify the session's cryptographic signature
        const authToken = request.cookies.MakerMarket
        const authSecret = process.env.AUTH_TOKEN_SECRET
        const decodedData = jwt.verify(authToken, authSecret)

        // Check if the verification succeeded
        if (decodedData){
            request.artist_name = decodedData.artist_name
            request.is_admin = decodedData.is_admin
        }
    }

    next()

}

module.exports = {
    protectPage,
    protectAPI,
    detectGuest
}