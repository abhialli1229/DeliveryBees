const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
// import controllers
const {register, login, logout, getLoggedInUser, resetpassword, newpassword, order,orderemail,readusers,readorders,orderupdate,orderstatus,adduseraccess,readuserorders,allUsers} = require("../controllers/user");


// import middlewares
const {userRegisterValidator, userById} = require('../middlewares/user');
const {verifyToken} = require('../middlewares/auth');


// api routes
router.post("/register",[
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').not().isEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i")
        .withMessage('Password must contain one upper case, one lower case, one number, and one special symbol'),
], userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

router.get('/user', verifyToken, userById, getLoggedInUser);

router.post("/resetpassword", resetpassword);

router.post("/newpassword", newpassword);

router.post("/order", order);

router.post("/orderemail", orderemail);

router.get("/users", readusers);

router.get("/orders", readorders);

router.get("/userorders", readuserorders);

router.post("/orderupdate", orderupdate);

router.get("/orderstatus", orderstatus);

router.post("/adduseraccess", adduseraccess);

router.get('/alluser',verifyToken,userById, allUsers );

module.exports = router;