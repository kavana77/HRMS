import {RequestHandler} from "express"
import User from "../models/User"
import bcrypt from "bcryptjs"

export const adminSignup: RequestHandler = async (req, res) => {
    try{
        const {fullName, companyName, email, phoneNumber, password, confirmPassword} = req.body
        if(!fullName || !companyName || !email || !phoneNumber || !password || !confirmPassword){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"})
        }
        const existingAdmin = await User.findOne({email: email.toLowerCase()})
        if(existingAdmin){
            return res.status(400).json({message: "Admin with this email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newAdmin = new User({
            fullName,
            companyName,
            email,
            phoneNumber,
            password: hashedPassword,
            role: "admin"})
        await newAdmin.save()
        return res.status(201).json({message: "Admin registered successfully"})
    }catch(error){
        console.error(error)
        return res.status(500).json({message: "Server error"})
    }
}