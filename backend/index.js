require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);


app.get("/", (req, res) => {
    res.json({data: "hello world!"});
});


//create account
app.post("/create-account", async (req, res) => {
    const {fullName, email, password} = req.body;

    if(!fullName){
        return res
        .status(400)
        .json({error: true, message: "Full name is required"});
    }

    if(!email){
        return res
        .status(400)
        .json({ error: true, mesage: "Password is required"});
    }

    const isUser = await User.findOne({email: email});

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

await user.save();

const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
});

return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
});

});

//login setup
app.post("/login", async (req, res) =>{
    const {email, password} = req.body;

    if(!email){
        return res.status(400).json({message: "Email is required"});
    }

    if(!password){
        return res.status(400).json({message: "Password is required"});
    }

    const userInfo = await User.findOne({email: email});

    if(!usrInfo){
        return res.status(400).json({message: "User not found"});
    }
    
})

app.listen(8000);

module.exports = app;




// require("dotenv").config();

// const config = require("./config.json");
// const mongoose = require("mongoose");

// mongoose.connect(config.connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const User = require("./models/user.model");

// const express = require("express");
// const cors = require("cors");
// const app = express();

// const jwt = require("jsonwebtoken");
// const { authenticateToken } = require("./utilities");

// app.use(express.json());

// app.use(
//     cors({
//         origin: "*",
//     })
// );

// app.get("/", (req, res) => {
//     res.json({ data: "hello world!" });
// });

// // Create account
// app.post("/create-account", async (req, res) => {
//     try {
//         const { fullName, email, password } = req.body;

//         if (!fullName) {
//             return res.status(400).json({ error: true, message: "Full name is required" });
//         }

//         if (!email) {
//             return res.status(400).json({ error: true, message: "Email is required" });
//         }

//         if (!password) {
//             return res.status(400).json({ error: true, message: "Password is required" });
//         }

//         const isUser = await User.findOne({ email });

//         if (isUser) {
//             return res.status(400).json({ error: true, message: "User already exists" });
//         }

//         const user = new User({ fullName, email, password });

//         await user.save();

//         const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
//             expiresIn: "36000m",
//         });

//         return res.json({
//             error: false,
//             user,
//             accessToken,
//             message: "Registration Successful",
//         });
//     } catch (error) {
//         console.error("Error creating account:", error);
//         return res.status(500).json({ error: true, message: "Internal Server Error" });
//     }
// });

// app.listen(8000, () => {
//     console.log("Server is running on port 8000");
// });

// module.exports = app;