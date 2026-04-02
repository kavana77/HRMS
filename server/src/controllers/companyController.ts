import { RequestHandler } from "express";
import Company from "../models/Company";

export const createCompanyProfile:RequestHandler = async(req ,res)=>{
    try {
        const {companyName, address, pincode, state, country} = req.body
        if(!companyName ||  !address || !pincode || !state || !country){
            return res.status(401).json({message: "All fields are required"})
        }
    //     const adminId = (req as any).userId;
    //     const existingCompany = await Company.findOne({adminId})
    //     if (existingCompany) {
    //         return res.status(409).json({
    //         message: "Company profile already exists"
    //     })
    // }
        const newCompanyProfile = new Company({
            companyName,
            // companyLogo,
            address,
            pincode,
            state,
            country,
            // adminId
        })
        await newCompanyProfile.save()
        return res.status(200).json({message: "Company data saved successfully", data: newCompanyProfile})

    } catch (error) {
        console.error("Failed to submit company form", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}