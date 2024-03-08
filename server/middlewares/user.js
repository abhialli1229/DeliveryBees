//const { body } = require("express-validator/check");
const User = require("../models/user");
const { body, validationResult } = require('express-validator');

exports.userRegisterValidator = [
    // username is not null
    body("username").notEmpty().withMessage("Username is required"),

    // email is not null, valid, and normalized
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),

    // check password
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must contain at least 6 characters")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i")
        .withMessage("Password must contain one upper case, one lower case, one number, and one special symbol"),

    // check for errors
    (req, res, next) => {
        const errors = validationResult(req);
        // if error, show the first one as it happens
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;

            return res.status(400).json({
                error: firstError,
            });
        }

        // proceed to the next middleware
        next();
    }
];

exports.userById = async (req, res, next) => {
	User.findById(req._id).exec((err, user) => {
		if (err || !user) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		// add user object in req with all user info
		req.user = user;

		next();
	});
};
