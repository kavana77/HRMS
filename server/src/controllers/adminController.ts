import { RequestHandler } from "express";
import AdminInvite from "../models/Admin";
import crypto from "crypto"

export const inviteAdmin:RequestHandler = async(req , res)=>{
    try {
        const {fullName, email, companyId} = req.body;
        if(!fullName || !email || !companyId){
            return res.status(400).json({message: "Missing required fields..."})
        }
        const existingInvite = await AdminInvite.findOne({email, companyId})
        if(existingInvite){
            return res.status(400).json({message: "An invite for this email already exists for the company"})
        }
        const token = crypto.randomBytes(32).toString("hex")
        const adminInvite = await AdminInvite.findOneAndUpdate(
            {email, companyId},
            {
                fullName,
                inviteToken: token,
                inviteExpires: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
                isVerified: false
            },
            {upsert: true, new: true}
        )
        const inviteLink = `${process.env.CLIENT_URL}/admin/signup?token=${token}`
        return res.status(201).json({message: "Admin invited successfully", inviteLink})

    } catch (error) {
        console.error("Failed to invite admin", error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}