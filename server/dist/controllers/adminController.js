"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteAdmin = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
const crypto_1 = __importDefault(require("crypto"));
const inviteAdmin = async (req, res) => {
    try {
        const { fullName, email, companyId } = req.body;
        if (!fullName || !email || !companyId) {
            return res.status(400).json({ message: "Missing required fields..." });
        }
        const existingInvite = await Admin_1.default.findOne({ email, companyId });
        if (existingInvite) {
            return res.status(400).json({ message: "An invite for this email already exists for the company" });
        }
        const token = crypto_1.default.randomBytes(32).toString("hex");
        const adminInvite = await Admin_1.default.findOneAndUpdate({ email, companyId }, {
            fullName,
            inviteToken: token,
            inviteExpires: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
            isVerified: false
        }, { upsert: true, new: true });
        const inviteLink = `${process.env.CLIENT_URL}/admin/signup?token=${token}`;
        return res.status(201).json({ message: "Admin invited successfully", inviteLink });
    }
    catch (error) {
        console.error("Failed to invite admin", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.inviteAdmin = inviteAdmin;
