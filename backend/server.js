const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({});
const connectDB = require('./Utilis/db');
const useRoute = require('./routes/user.route');
const companyRoute = require("./routes/compnay.route");
const jobRoute = require("./routes/jobs.route");
const applicationRoute = require('./routes/applications.route');


//db 
connectDB();

//middleware
const app = express();
app.use(express.json()); // for understand json data sent by frontend
app.use(express.urlencoded({ extended: true })); //This allows Express to understand data sent using HTML forms / URL-encoded format.
app.use(cookieparser());// This helps Express read cookies sent by the browser.
const corsOptions = {
    origin: 'https://frontend-psi-vert-66.vercel.app',
    credentials: true
} //"I allow my React frontend running on localhost:5173 to communicate with me."
app.use(cors(corsOptions)) //It allows things like cookies to be included in cross-origin requests.This is imPORTant if you're doing authentication with JWT stored in cookies.

const PORT = process.env.PORT || 8000;

app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    })
});

//api
app.use("/api/v1/user", useRoute);
app.use("/api/v1/compnay", companyRoute);
app.use("/api/v1/jobRoute", jobRoute);
app.use("/api/v1/appRoute", applicationRoute)

app.listen(PORT, () => {
    console.log("server is running at :- ", PORT)
});