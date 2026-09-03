const Job = require('../models/job.model')

// how many jobs admin created
exports.postJob = async (req, resp) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, experience, companyId } = req.body;
        const userID = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId) {
            return resp.status(400).json({
                message: "All fields  are required",
                success: false
            })
        }
        const jobData = new Job({
            title: title,
            description: description,
            requirements: requirements,
            salary: salary,
            location: location,
            jobType: jobType,
            position: position,
            experience: experience,
            companyId: companyId,
            createdBy: userID

        })

        await jobData.save();
        return resp.status(201).json({
            message: "Job is created successfully",
            job: jobData,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            success: false,
            error: error.message
        })
    }
}

// students
exports.getAllJobs = async (req, resp) => {
    try {
        const keyWord = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyWord, $options: "i" } },
                { descriptions: { $regex: keyWord, $options: "i" } }
            ]
        };
        const job = await Job.find(query).populate({
            path: "companyId"
        }).sort({ created: -1 })
        if (!job) {
            return resp.status(400).json({
                message: "job not found",
                success: false
            })
        }

        return resp.status(200).json({
            message: "job found",
            job,
            success: true,
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            success: false,
            error: error.message
        })
    }
}

// students
exports.getJobBYId = async (req, resp) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return resp.status(404).json({
                message: "jobs not found",
                success: false,
            })
        }
        return resp.status(200).json({
            message: "jobsfound",
            job,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            error: error.message
        })
    }
}

//get jobs that created by admin
exports.getJobsByAdmin = async (req, resp) => {
    try {
        const adminID = req.id;
        const jobs = await Job.find({ createdBy: adminID });
        if (!jobs) {
            return resp.status(404).json({
                message: "jobs not found",
                success: false
            })
        }
        return resp.status(200).json({
            message: "jobs are found",
            success: true,
            job: jobs
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            error: error.message
        })
    }
}