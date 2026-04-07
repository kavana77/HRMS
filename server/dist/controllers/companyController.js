"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanyProfile = void 0;
const Company_1 = __importDefault(require("../models/Company"));
const createCompanyProfile = async (req, res) => {
    try {
        const { companyName, address, pincode, state, country } = req.body;
        if (!companyName || !address || !pincode || !state || !country) {
            return res.status(401).json({ message: "All fields are required" });
        }
        //     const adminId = (req as any).userId;
        //     const existingCompany = await Company.findOne({adminId})
        //     if (existingCompany) {
        //         return res.status(409).json({
        //         message: "Company profile already exists"
        //     })
        // }
        const newCompanyProfile = new Company_1.default({
            companyName,
            // companyLogo,
            address,
            pincode,
            state,
            country,
            // adminId
        });
        await newCompanyProfile.save();
        return res.status(200).json({ message: "Company data saved successfully", data: newCompanyProfile });
    }
    catch (error) {
        console.error("Failed to submit company form", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createCompanyProfile = createCompanyProfile;
