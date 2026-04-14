"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanyProfile = void 0;
const Company_1 = __importDefault(require("../models/Company"));
const fileService_1 = require("../service/fileService");
const createCompanyProfile = async (req, res) => {
    try {
        const { companyName, registeredAddress, pincode, state, country } = req.body;
        if (!companyName || !registeredAddress || !pincode || !state || !country) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //     const adminId = (req as any).userId;
        //     const existingCompany = await Company.findOne({adminId})
        //     if (existingCompany) {
        //         return res.status(409).json({
        //         message: "Company profile already exists"
        //     })
        // }
        let companyLogo = "";
        let publicId = "";
        if (req.file) {
            const uploadResult = await (0, fileService_1.cloudinaryUpload)(req.file);
            companyLogo = uploadResult.url;
            publicId = uploadResult.public_id;
        }
        const newCompanyProfile = new Company_1.default({
            companyName,
            companyLogo,
            publicId,
            registeredAddress,
            pincode,
            state,
            country,
            // adminId
        });
        await newCompanyProfile.save();
        return res.status(201).json({ message: "Company data saved successfully", data: newCompanyProfile });
    }
    catch (error) {
        console.error("Failed to submit company form", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createCompanyProfile = createCompanyProfile;
