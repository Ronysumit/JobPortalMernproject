const express = require('express');
const {
    registerCompany,
    getcompany,
    getompanyById,
    updatecomapny
} = require('../controllers/company.controller');
const isAuthentication = require("../middlewarws/authentication");

const router = express.Router();
router.route("/registerCompany").post(isAuthentication, registerCompany);
router.route("/getcompany").get(isAuthentication, getcompany);
router.route("/getompanyById/:id").get(isAuthentication, getompanyById);
router.route("/updatecomapny/:id").put(isAuthentication, updatecomapny);

module.exports = router;