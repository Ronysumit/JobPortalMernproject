const express = require('express');
const {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
} = require('../controllers/application.controller')
const isAuthentication = require("../middlewarws/authentication");
const router = express.Router();

router.route('/applyJob/:id').post(isAuthentication, applyJob);
router.route('/getAppliedJobs').get(isAuthentication, getAppliedJobs);
router.route('/getApplicants/:id').get(isAuthentication, getApplicants);
router.route('/updateStatus/:id').patch(isAuthentication, updateStatus);

module.exports = router;