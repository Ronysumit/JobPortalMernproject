
const Job = require('../models/job.model')
const Application = require('../models/application.model')
exports.applyJob = async (req, resp) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return resp.status(400).json({
                message: "jobId is missing",
                success: false
            })
        }

        // Check if job exists
        const job = await Job.findById(jobId)
        if (!job) {
            return resp.status(404).json({
                message: "job not found",
                success: false
            })
        }

        //check if the user has already applayed for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return resp.status(400).json({
                message: "You have already applied for this job",
                success: false,
                error: error.message
            })
        }

        //Create appliaction
        const application = new Application({
            job: jobId,
            applicant: userId,
        })

        // Add application ID to job
        job.applications.push(application._id)

        // Save both documents
        await application.save();
        await job.save();

        return resp.status(201).json({
            message: "job applied successfully",
            application,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server Problem",
            error: error.message,
            success: false

        })
    }
}

exports.getAppliedJobs = async (req, resp) => {
    try {
        const userId = req.id;

        const allApplications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            populate: {
                path: "companyId"
            }
        });

        if (allApplications.length === 0) {
            return resp.status(404).json({
                message: "Applications not found",
                success: false
            })
        }
        return resp.status(200).json({
            message: "Appied jobs are",
            allApplications,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server Problem",
            error: error.message,
            success: false

        })
    }
}

exports.getApplicants = async (req, resp) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return resp.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return resp.status(200).json({
            message: "job is found",
            job,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            errror: error.message
        })
    }
}

exports.updateStatus = async (req, resp) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return resp.status(400).json({
                message: "status is required",
                success: false
            })
        }

        const findApplication = await Application.findOne({ _id: applicationId })
        if (!findApplication) {
            return resp.status(404).json({
                message: "Application is required",
                success: false
            })
        }
        // update status
        findApplication.status = status.toLowerCase();
        await findApplication.save()
        return resp.status(200).json({
            message: "Status update successfully",
            success: true
        })

    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            error: error.message
        })
    }
}