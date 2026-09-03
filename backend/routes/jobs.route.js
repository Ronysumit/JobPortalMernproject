const express = require('express');
const {
    postJob,
    getAllJobs,
    getJobBYId,
    getJobsByAdmin
} = require('../controllers/job.controller');
const isAuthentication = require("../middlewarws/authentication");

const router = express.Router();
router.route("/postJob").post(isAuthentication, postJob);
router.route("/getAllJobs").get(isAuthentication, getAllJobs);
router.route("/getJobBYId/:id").get(isAuthentication, getJobBYId);
router.route("/getJobsByAdmin").get(isAuthentication, getJobsByAdmin);

module.exports = router;