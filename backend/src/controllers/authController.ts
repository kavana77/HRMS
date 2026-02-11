import { RequestHandler } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User"
import env from "../utils/validateEnv"

export const register:RequestHandler =async (req , res)=>{
    const {email,password,role} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        if(!email|| !password ||  !role){
            return res.status(400).json({message: "Missing required fields"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ email, password: hashedPassword, role})
        await newUser.save()
        res.status(201).json({message: `User registered with email ${email}`})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal Server error"})
    }
}
export const setPassword: RequestHandler = async (req ,res)=>{
    const {token, password} = req.body
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as {id: string}
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate(decoded.id, {
            password: hashedPassword
        })
        res.status(200).json({message: "Password set successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server error", error})
    }
}
export const login:RequestHandler =async (req , res)=>{
    const {email,password} = req.body
    try {
       const user = await User.findOne({email})
       if(!user){
        return res.status(401).json({message: "User not found"})
       } 
       const isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch){
        return res.status(400).json({message : "Invalid credentials"})
       }
       const token = jwt.sign({id: user._id, role: user.role}, env.JWT_SECRET, {expiresIn: "1h"})
       res.status(200).json({token: token, role: user.role})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal Server issue",error})
    }
}