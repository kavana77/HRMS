import mongoose from "mongoose"
import { User } from "../types/user.types"
const userSchema = new mongoose.Schema<User>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["admin"]
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type: String
        },
        verificationTokenExpiry: {
            type: Date
        },
        companyId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            default: null
        }

    },{
        timestamps: true
    }
)
const User = mongoose.model("User", userSchema)
export default User