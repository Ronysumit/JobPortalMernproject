const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type:String,
        required:true,
    },
    password: {
        type: String,
        required:true
    },
    role :{
        type: String,
        enum: ['student', 'recruiter'], // when there is option we use enum
        required: true
    },
    profile: {
        bio: {type:String},
        skills: [{type: String}],
        resume: {type: String}, //URL to resue file
        resumeOriginalName: {type: String},
        company:{type: mongoose.Schema.Types.ObjectId , ref: 'Company'}, // relation between user and company
        profilePhoto: {
            type:String,
            default:""
        }
    }
} , {timestamps: true});

module.exports = mongoose.model('User' , userSchema)