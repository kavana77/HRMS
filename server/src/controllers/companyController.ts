import { RequestHandler } from "express";
import Company from "../models/Company";
import { cloudinaryUpload } from "../service/fileService";

export const createCompanyProfile:RequestHandler = async(req ,res)=>{
    try {
        const {companyName, registeredAddress, pincode, state, country} = req.body
        if(!companyName ||  !registeredAddress || !pincode || !state || !country){
            return res.status(400).json({message: "All fields are required"})
        }
    //     const adminId = (req as any).userId;
    //     const existingCompany = await Company.findOne({adminId})
    //     if (existingCompany) {
    //         return res.status(409).json({
    //         message: "Company profile already exists"
    //     })
    // }
        let companyLogo = ""
        let publicId = ""
        if(req.file){
            const uploadResult = await cloudinaryUpload(req.file)
            companyLogo = uploadResult.url
            publicId = uploadResult.public_id
        }
        const newCompanyProfile = new Company({
            companyName,
            companyLogo,
            publicId,
            registeredAddress,
            pincode,
            state,
            country,
            // adminId
        })
        await newCompanyProfile.save()
        return res.status(201).json({message: "Company data saved successfully", data: newCompanyProfile})

    } catch (error) {
        console.error("Failed to submit company form", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}