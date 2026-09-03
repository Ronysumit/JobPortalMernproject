const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true,
    },
    website: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    logo: {
        type: String, //URL to company logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Company', companySchema)