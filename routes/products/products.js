/*
Author: Capstone Spring 2023
Description: Maker Market product page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const db = require("../../helpers/database")

// Import required database queries
const { getProductInfo } = require("../../helpers/sql")

// Import router middleware
const router = express.Router()

// Handle product page requests
router.get("/", async (request, response) => {

    //TODO: Get product images from database and pass as an array of images
    // Grab all of the products from the database
    const products = await db.query(getProductInfo)

    return response
    .status(200)
    .render("products/products", {products: products[0]})
})

// Export route middleware so it can be used in other components
module.exports = router