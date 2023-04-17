/*
Author: Capstone Spring 2023
Description: Handle session validation
Documentation: https://www.npmjs.com/package/jsonwebtoken,
*/

// Import the the JsonWebToken middleware
const jwt = require("jsonwebtoken")

/*
protectWebPage will only allow authenticated user session to access
any page it is protecting. Unauthorized or bad session will be redirected
to the login page where they can sign in
*/
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

/*
protectEndpoint will only allow authenticated user session to access
any API it is protecting. Unauthorized or bad session will be rejected by
the endpoint
*/
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

/*
allowGuests is used on pages where the user may or may not have a session.
If a session does exist, the session will be verified before extracting
the session data. However, if a session is not active, it will default
to a guest session that can be used to view the page
*/
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