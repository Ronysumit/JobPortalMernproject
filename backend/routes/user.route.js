const express = require('express');
const {
    register,
    login,
    logout,
    updateProfile
} = require('../controllers/user.controller');
const isAuthentication = require("../middlewarws/authentication");
const singleUpload = require('../middlewarws/multer')

const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/updateProfile").post(isAuthentication, singleUpload, updateProfile);

module.exports = router;