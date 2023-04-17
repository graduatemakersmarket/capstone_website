/*
Author: Capstone Spring 2023
Description: Maker Market product page controller
Documentation: N/A
*/

// Import the required middleware
const express = require("express")
const db = require("../helpers/database")

// Import router middleware
const router = express.Router()

// Handle product page requests
router.get("/", async (request, response) => {

    // This will be changed to get all of the products from the database
    const products = await db.query("SELECT artist FROM makermarket.artists")

    return response
    .status(200)
    .render("products", {products: products[0]})
})

// Export route middleware so it can be used in other components
module.exports = router