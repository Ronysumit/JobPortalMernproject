const jwt = require('jsonwebtoken');

const isAuthentication = async (req, resp, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return resp.status(400).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token , process.env.SECRET_KEY)
        if (!decode) {
            return resp.status(400).json({
                message: "Invalid token",
                success: false
            })
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        return resp.status(500).json({
            message: "Internal server problem",
            error: error.message,
            success: false
        })
    }
}
module.exports = isAuthentication;