const cloudinary = require("../Utilis/cloudinary");

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            resource_type: "auto"
        },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }

        )
        stream.end(buffer)
    })
}

module.exports = uploadToCloudinary