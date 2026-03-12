import {RequestHandler} from "express"
import User from "../models/User"
import bcrypt from "bcryptjs"
import env from "../utils/validateEnv"
import jwt from "jsonwebtoken"

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
        return res.status(500).json({message: "Internal Server error"})
    }
}

export const adminLogin:RequestHandler= async(req ,res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Admin does not exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
       const token = jwt.sign({id: user._id, role: user.role}, env.JWT_SECRET, {expiresIn: "1h"})
       console.log(token)
       return res.status(200).json({token: token})
    } catch (error) {
        console.error("Error in login", error)
        return res.status(500).json({meesage: "Internal Server error"})
    }
}