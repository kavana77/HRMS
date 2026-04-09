import { RequestHandler } from "express";
import Policy from "../models/Policy";
import { cloudinaryUpload } from "../service/fileService";

export const createPolicy:RequestHandler = async(req , res)=>{
    try {
        const {policyName,category, effectiveFrom, status } = req.body
        
        if(!policyName || !category || !effectiveFrom || !status){
            return res.status(400).json({message: "All fields are required"})
        }
        // upload file
        let documentUrl = ""
        let publicId = ""

        if(req.file){
            const uploadResult = await cloudinaryUpload(req.file)
            documentUrl = uploadResult.url
            publicId = uploadResult.public_id
        }
        
        const policy = await Policy.create({
            policyName,
            category,
            effectiveFrom,
            documentUrl,
            publicId,
            status
        })
        return res.status(201).json({message: "Policy created successfully", data: policy})
    } catch (error) {
        console.error("Failed to create policy", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getPolicies:RequestHandler = async(req ,res) => {
    try {
        const policy = await Policy.find().sort({createdAt: -1})
        return res.status(201).json({message: "Policy data fetched successfully", policy})
    } catch (error) {
        console.error("Failed to get policies", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getPolicyById:RequestHandler = async(req ,res)=>{
    try {
        
    } catch (error) {
        console.error("Failed to get policy by id", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updatePolicy:RequestHandler = async(req ,res)=>{
    try {
        const {id} = req.params
        const {policyName, category, effectiveFrom, documentUrl, status}= req.body
        const updatedPolicy = await Policy.findByIdAndUpdate({id}, {policyName, category, effectiveFrom, documentUrl, status}, {new: true})
        return res.status(200).json({message: "Policy updated successfully", data: updatedPolicy})
    } catch (error) {
        console.error("Failed to update policy", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}