const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const registerUser  = async (req, res) =>{
    try {
        const {username, email, password, role} = req.body;

        if (!username || !email ||  !password || !role) {
           return res.status(400).json({success: false, message: "All Fileds Required"})
        }

        const existingUser  = await User.findOne({email})
        if (existingUser ) { 
            return res.status(400).json({success: false, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            {
            username,
            email,
            password: hashedPassword,
            role
        }
        )
        res.status(201).json({success: true, message: "User Registered Successfully", user});

    } catch (error) {
        console.log("User registration Failed...");
        res.status(500).json({ message: error.message })
    }
};

const loginUser  = async (req, res) => {
   try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({success: false, message: "All Fileds Required"});
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({success: false, message: "User Not Exist"})
        }

        const isPasswordVaild = await bcrypt.compare(password,user.password );
        if (!isPasswordVaild) {
            res.status(400).json({success: false, message: "Password Not Matched"})
        }

        const token = jwt.sign(
            {authId: user._id, role: user.role},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN || "1d"}
        )
        
        res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production", 
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
              maxAge: 24 * 60 * 60 * 1000,
        });



        res.status(200).json({
            success: true, message: "Login successful", 
            token,
            user: {
                authId: user._id,
                name : user.username,
                email: user.email,
                role: user.role
            }
        })
   } catch (error) {
        console.log("Login: ", error.message);
        res.status(500).json({ message: error.message });
   }
}

module.exports = {
    registerUser,
    loginUser

}
