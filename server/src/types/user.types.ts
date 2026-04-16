import mongoose, {Document} from "mongoose"
export interface User extends Document {
    fullName: string,
    companyName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: "admin",
    companyId?: mongoose.Types.ObjectId,
    isVerified?: boolean,
    verificationToken?: string,
    verificationTokenExpiry?: Date,
    isFirstLogin: boolean,
    completedSteps: [string]
    
}