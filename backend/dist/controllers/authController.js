"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.setPassword = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.status(404).json({ message: "Missing required fields" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: `User registered with email ${email}` });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error", error });
    }
};
exports.register = register;
const setPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, validateEnv_1.default.JWT_SECRET);
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await User_1.default.findByIdAndUpdate(decoded.id, {
            password: hashedPassword
        });
        res.status(200).json({ message: "Password set successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error", error });
    }
};
exports.setPassword = setPassword;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, validateEnv_1.default.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token: token, role: user.role });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server issue", error });
    }
};
exports.login = login;
