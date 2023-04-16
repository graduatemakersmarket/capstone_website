const express = require("express")
const db = require("../helpers/database")
const router = express.Router()

router.get("/", async (request, response) => {

    const artists = await db.query("SELECT artist FROM makermarket.artists")

    return response
    .status(200)
    .render("products", {profiles: artists[0]})
})

module.exports = router