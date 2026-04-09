import mongoose from "mongoose"
import { IPolicy } from "../types/policy.types"

const policySchema = new mongoose.Schema<IPolicy>(
    {
        policyName:{
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            enum: ["HR", "Security", "Compliance", "IT", "Finance"],
            default: "HR"
        },
        effectiveFrom: {
            type: Date,
            required: true
        },
        documentUrl: {
            type: String,
            required: true
        },
        publicId: {
            type: String
        },
        status: {
            type: String,
            enum: ["Active", "Draft"]
        }
    }
    ,{timestamps: true}
)
const Policy = mongoose.model("Policy", policySchema)
export default Policy