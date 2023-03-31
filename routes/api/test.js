const express = require("express")
const router = express.Router()

const { validationResult } = require("express-validator")
const { testAPIValidation } = require("../../helpers/validation")

router.post("/", testAPIValidation, (request, response) => {

    // Send most recent form validation error to requesting connection
    if (!validationResult(request).isEmpty()){
        return response
        .status(400)
        .json({success: false, error: validationResult(request).errors[0].msg})
    }

    // Grab username, password and message from the request body
    const username = request.body.username
    const password = request.body.password
    const message = request.body.message

    // Do processing with information here

    // Send username, password and message to front-end
    return response
    .status(200)
    .render("index", {username: username, password:password, message:message})
})


router.get("/", (request, response) => {

    return response
    .status(400)
    .json({"response": "This endpoint does not support GET requests"})
})

module.exports = router