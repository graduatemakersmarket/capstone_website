/*
Author: Capstone Spring 2023
Description: Maker Market product profile page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const db = require("../../helpers/database")

// Import required database queries
const { getProductProfile } = require("../../helpers/sql")

// Import router middleware
const router = express.Router()

// Handle artist profile requests
router.get("/:product", async (request, response) => {

    //TODO: Get product images from database and pass as an array of images
    // Grab product information from the database
    const productInfo = await db.query(getProductProfile, [request.params.product])

    return response
    .status(200)
    .render("products/profile", {product: productInfo[0][0]})
})

// Export route middleware so it can be used in other components
module.exports = router