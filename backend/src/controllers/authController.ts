import { RequestHandler } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User"
import env from "../utils/validateEnv"

export const register:RequestHandler =async (req , res)=>{
    const {username,password,role} = req.body
    try {
        if(!username || !password || !role){
            return res.status(404).json({message: "Missing required fields"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ username, password:hashedPassword,role})
        await newUser.save()
        res.status(201).json({message: `User registered with username ${username}`})
    } catch (error) {
        return res.status(500).json({message: "Internal Server error", error})
    }
}

export const login:RequestHandler =async (req , res)=>{
    const {username,password} = req.body
    try {
       const user = await User.findOne({username})
       if(!user){
        return res.status(404).json({message: "User not found"})
       } 
       const isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch){
        return res.status(400).json({message : "Invalid credentials"})
       }
       const token = jwt.sign({id: user._id, role: user.role}, env.JWT_SECRET, {expiresIn: "1h"})
       res.status(200).json({token: token})
    } catch (error) {
        
    }
}