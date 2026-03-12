import { Request, Response, NextFunction } from "express";

interface UserPayload {
  role: string;
}
const authorizeRoles = (...allowedRoles: string[])=>{
    return (req: Request , res: Response, next: NextFunction) => {
        const user = req.user as UserPayload | undefined;
        console.log("ROLE FROM TOKEN:", req.user?.role);
    console.log("ALLOWED ROLES:", allowedRoles);
        if(!user || !allowedRoles.includes(user.role)){
            return res.status(403).json({message: "Access denied"})
        }
        next()
    }
}
export default authorizeRoles