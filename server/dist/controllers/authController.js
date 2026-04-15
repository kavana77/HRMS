"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.adminSignup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import crypto from "crypto"
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminSignup = async (req, res) => {
    try {
        const { fullName, email, companyName, phoneNumber, password, confirmPassword } = req.body;
        if (!fullName || !email || !companyName || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const existingAdmin = await User_1.default.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists" });
        }
        // hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // generate verification token
        // const verificationToken = crypto.randomBytes(32).toString("hex")
        // token expiry (5min)
        // const verificationTokenExpiry = new Date(Date.now() + 5 * 60 * 1000)
        const newAdmin = new User_1.default({
            fullName,
            companyName,
            email: email.toLowerCase(),
            phoneNumber,
            password: hashedPassword,
            role: "admin",
            // isVerified: false,
            // verificationToken,
            // verificationTokenExpiry
        });
        await newAdmin.save();
        // verification link
        // const verifyLink = `${env.CLIENT_URL}/admin/verify-email?token=${verificationToken}`
        //  const subject = "Verify your email"
        // const text = `Click the link to verify your email: ${verifyLink}`
        // const html = `
        //   <h2>Email Verification</h2>
        //   <p>Hello ${fullName},</p>
        //   <p>Please click the button below to verify your email:</p>
        //   <a href="${verifyLink}" style="padding:10px 20px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;">
        //     Verify Email
        //   </a>
        //   <p>This link will expire in 5 minutes.</p>
        // `
        //  SEND EMAIL (IMPORTANT FIX)
        // await sendEmail(email, subject, text, html)
        return res.status(201).json({ message: "Signup successful. Please verify your email ", email: newAdmin.email });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.adminSignup = adminSignup;
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Admin does not exists" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, validateEnv_1.default.JWT_SECRET, { expiresIn: "1h" });
        console.log(token);
        return res.status(200).json({ token: token,
            user: {
                fullName: user.fullName,
                email: user.email,
                companyName: user.companyName
            }
        });
    }
    catch (error) {
        console.error("Error in login", error);
        return res.status(500).json({ meesage: "Internal Server error" });
    }
};
exports.adminLogin = adminLogin;
