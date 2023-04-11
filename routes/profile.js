const express = require("express")
const router = express.Router()

router.get("/", (request, response) => {
    
    return response
    .status(200)
    .render("profile", {pages:["artist1", "artist2"]})
})

module.exports = router