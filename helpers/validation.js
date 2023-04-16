/*
Author: Capstone Spring 2023
Description: Handle form input validation
Documentation: https://express-validator.github.io/docs/
*/

// Import the express validator middleware
const { check } = require("express-validator")

// Validate account creation user input
const createAccountValidation = [

    check("username")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank usernames are not allowed")
        .isLength({min: 3})
        .withMessage("Usernames must be at least (3) characters")
        .isLength({max: 30})
        .withMessage("Usernames may not exceed (30) characters"),

    check("email")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank email addresses are not allowed")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email addresses must be in a valid format")
        .isLength({max: 254})
        .withMessage("Passwords may not exceed (254) characters"),

    check("password")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank passwords are not allowed")
        .isLength({min: 8})
        .withMessage("Passwords must be at least (8) characters")
        .isLength({max: 60})
        .withMessage("Passwords may not exceed (60) characters"),

    check("password_verify")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank passwords are not allowed")
        .isLength({min: 8})
        .withMessage("Passwords must be at least (8) characters")
        .isLength({max: 60})
        .withMessage("Passwords may not exceed (60) characters")
        .custom((password, {req}) => (password === req.body.password))
        .withMessage("Both passwords must match"),

    check("terms")
        .escape()
        .trim()
        .exists()
        .withMessage("You must accept the terms and conditions to proceed"),
]

// Validate account login user input
const accountLoginValidation = [

    check("username")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank usernames are not allowed")
        .isLength({min: 3})
        .withMessage("Usernames must be at least (3) characters")
        .isLength({max: 30})
        .withMessage("Usernames may not exceed (30) characters"),

    check("password")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank passwords are not allowed")
        .isLength({min: 8})
        .withMessage("Passwords must be at least (8) characters")
        .isLength({max: 60})
        .withMessage("Passwords may not exceed (60) characters"),
]

// Validate account login user input
const test = [

    check("firstname")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Blank usernames are not allowed")
        .isLength({min: 3})
        .withMessage("Usernames must be at least (3) characters")
        .isLength({max: 30})
        .withMessage("Usernames may not exceed (30) characters"),
]

// Import the validators so they can be used in different components
module.exports = {
    createAccountValidation,
    accountLoginValidation,
    test
}