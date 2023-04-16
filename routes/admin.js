const express = require("express")
const db = require("../helpers/database")
const router = express.Router()

router.get("/", async (request, response) => {

    // I will improve this tomorrow, but for now this will pull the user
    // information from the database and pass it into the template

    // I also improved the loop in the template so it is much easier to
    // call specific data out, especially if there is a lot of data
    const artists = await db.query("SELECT artist FROM makermarket.artists")

    return response
    .status(200)
    .render("admin", {profiles: artists[0]})
})

module.exports = router