const express = require("express")
const router = express.Router()

router.get("/", (request, response) => {
    
    const username = "Guest"
    const password = ""
    const message = "Welcome to the website (This is a test message from the back-end)"
    return response
    .status(200)
    .render("index", {username: username, password:password, message:message})
})

module.exports = router