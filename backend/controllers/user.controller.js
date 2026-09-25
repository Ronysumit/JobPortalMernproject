const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const uploadToCloudinary = require('../Utilis/UploadToCloudinary');
exports.register = async (req, resp) => {
    try {
        const { fullname, email, phoneNumber, password, role, profile } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return resp.status(400).json({ message: 'All fields are required' })
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return resp.status(400).json({ message: 'user already exists' })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        let profilePhoto = ""
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            profilePhoto = result.secure_url;
        }

        const user = new User({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role,
            profile: {
                ...profile,
                profilePhoto: profilePhoto
            }
        })
        await user.save();
        return resp.status(201).json({ message: "User registered successfully", success: true })
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error", error: error.message, success: false })
    }
}

exports.login = async (req, resp) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return resp.status(400).json({ message: 'email and password required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(400).json({ message: 'password incorrect' })
        }
        // check role is correct or not
        if (role !== user.role) {
            return resp.status(400).json({ message: "Accounts does't exists with correct role" })
        }
        const tokenData = {
            userId: user._id
        }
        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
        return resp.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none' ,  secure: true }).json({
            message: `Login successful. Welcome ${user.fullname}`,
            user: userData,
            success: true
        })

    } catch (error) {
        resp.status(500).json({ message: 'Internal server error', error: error.message, success: false })
    }

}

exports.logout = async (req, resp) => {
    try {
        return resp.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully", success: true })
    } catch (error) {
        return resp.status(500).json({ message: "Internal server problem", error: error.message, success: false })
    }
}

exports.updateProfile = async (req, resp) => {
    try {
        const { fullname, email, phoneNumber, skills, bio } = req.body;

        if (!fullname || !email || !phoneNumber) {
            return resp.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const skillsArray = skills
            ? skills.split(",").map(skill => skill.trim())
            : [];

        const userId = req.id; // set by authentication middleware

        let user = await User.findById(userId);

        if (!user) {
            return resp.status(400).json({
                message: "User not found",
                success: false
            });
        }
        // updateing data
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.skills = skillsArray;
        user.profile.bio = bio
        //resume comes later

        if (req.file) {
            console.log("File received:", req.file.originalname);
            console.log("File size:", req.file.size);
            const result = await uploadToCloudinary(req.file.buffer);
            console.log("Cloudinary URL:", result.secure_url);
            user.profile.resume = result.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return resp.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        });

    } catch (error) {
        return resp.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};