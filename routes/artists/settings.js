const express = require("express")
const router = express.Router()

router.get("/", (request, response) => {
    return response
    .status(200)
    .render("artists/settings",)
})

module.exports = router