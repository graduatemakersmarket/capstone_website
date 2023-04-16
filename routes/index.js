const express = require("express")
const router = express.Router()

// Import the custom protectAPI middleware
const { allowGuests } = require("../helpers/sessions")

router.get("/", allowGuests, async (request, response) => {

    return response
    .status(200)
    .render("index")
})

module.exports = router