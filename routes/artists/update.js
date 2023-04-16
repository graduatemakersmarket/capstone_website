const express = require("express")
const router = express.Router()
const fs = require("fs")
const db = require("../../helpers/database")

// Import required database queries
const { getAccountInfo } = require("../../helpers/sql")

// Import session handler
const { protectWebPage } = require("../../helpers/sessions")

router.get("/", protectWebPage, async (request, response) => {
    // Fetch account settings from the database
    const accSettings = await db.query(getAccountInfo, [request.artist_name])

    // Collect values from query and pack into a JSON string
    const accountSettings = {
        "first_name": accSettings[0][0].firstname,
        "last_name": accSettings[0][0].lastname,
        "avatar": accSettings[0][0].avatar,
        "facebook": accSettings[0][0].facebook,
        "instagram": accSettings[0][0].instagram,
        "twitter": accSettings[0][0].twitter,
        "website": accSettings[0][0].website,
        "biography": accSettings[0][0].biography

    }

    return response
    .status(200)
    .render("artists/update", accountSettings)
})

module.exports = router