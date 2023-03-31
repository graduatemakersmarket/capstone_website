const { check } = require("express-validator")

const testAPIValidation = [

    check("username")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank usernames are not allowed")
        .isLength({min: 3})
        .withMessage("Usernames must be at least (3) characters")
        .isLength({max: 15})
        .withMessage("Usernames may not exceed (15) characters"),
    
    check("password")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank passwords are not allowed")
        .isLength({min: 12})
        .withMessage("Passwords must be at least (12) characters")
        .isLength({max: 60})
        .withMessage("Passwords may not exceed (60) characters"),
    
    check("message")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Message field may not be empty"),
]

module.exports = {
    testAPIValidation
}