const { check } = require("express-validator")

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
        .withMessage("Email addresses must be in a valid format"),

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

const accountUpdateValidation = [

    check("firstname")
        .escape()
        .trim()
        .isLength({min: 3})
        .withMessage("First name must be at least (3) characters")
        .isLength({max: 30})
        .withMessage("First name may not exceed (30) characters"),

    check("lastname")
        .escape()
        .trim()
        .isLength({min: 3})
        .withMessage("Last name must be at least (3) characters")
        .isLength({max: 30})
        .withMessage("Last name may not exceed (30) characters"),

    check("avatar")
        .escape()
        .trim(),

    check("instagram")
        .escape()
        .trim(),

    check("facebook")
        .escape()
        .trim(),

    check("twitter")
        .escape()
        .trim(),

    check("website")
        .escape()
        .trim(),

    check("biography")
        .escape()
        .trim(),
]

module.exports = {
    createAccountValidation,
    accountLoginValidation,
    accountUpdateValidation
}