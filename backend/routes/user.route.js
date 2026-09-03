const express = require('express');
const {
    register,
    login,
    logout,
    updateProfile
} = require('../controllers/user.controller');
const isAuthentication = require("../middlewarws/authentication");

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/updateProfile").post(isAuthentication, updateProfile);

module.exports = router;