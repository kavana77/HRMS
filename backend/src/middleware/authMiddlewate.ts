import { RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../utils/validateEnv'

declare module "express-serve-static-core"{
    interface Request {
        user?: string | JwtPayload
    }
}
const verifyToken:RequestHandler = (req , res , next) => {
let token: string | undefined;
const authHeader =
  typeof req.headers.authorization === "string"
    ? req.headers.authorization
    : undefined;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
    }
    if(!token){
        return res.status(401).json({message: "No token, authorization denied"})
    }
    try {
        const decode = jwt.verify(token, env.JWT_SECRET as string)
        req.user = decode
        console.log("The decoded user is : ", req.user)
        next()
    } catch (error) {
        console.error(error)
        res.status(400).json({message: "Token is not valid", error})
    }
}

export default verifyToken