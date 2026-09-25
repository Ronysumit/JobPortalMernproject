const Company = require('../models/company.model')
const uploadToCloudinary = require('../Utilis/UploadToCloudinary')
exports.registerCompany = async (req, resp) => {
    try {
        const { name } = req.body;

        if (!name) {
            return resp.status(400).json({
                message: "comapnay name is required",
                success: false
            })
        }

        let company = await Company.findOne({ name: name });
        if (company) {
            return resp.status(400).json({ message: "company can't register same company", success: false })
        }

        const companyData = new Company({
            name: name,
            userId: req.id
        })

        await companyData.save();
        return resp.status(201).json({
            message: "company registered successfully",
            company: companyData,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            error: error.message,
            success: false
        })
    }
}

exports.getcompany = async (req, resp) => {
    try {
        const userId = req.id; //loged in userId
        const companies = await Company.find({ userId });
        if (!companies) {
            return resp.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return resp.status(200).json({
            message: "company is found",
            companies,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            succes: false
        })
    }
}

exports.getompanyById = async (req, resp) => {
    try {
        const comapnayId = req.params.id;
        const company = await Company.findById(comapnayId);
        if (!company) {
            return resp.status(404).json({
                message: "company not found",
                success: false
            })
        }

        return resp.status(200).json({
            message: "company is found",
            company: company,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            error: error.message,
            succes: false
        })
    }
}

exports.updatecomapny = async (req, resp) => {
    try {
        const { name, description, website, location } = req.body;
        // cloudinary 
        let logo = undefined;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer)
            logo = result.secure_url;
        }


        const updateData = { name, description, website, location };
        if (logo) {
            updateData.logo = logo;
        }
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return resp.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return resp.status(200).json({
            message: "Company data updated..",
            company: company,
            success: true
        })
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            error: error.message,
            success: false
        })
    }
}