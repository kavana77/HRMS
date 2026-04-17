import mongoose from "mongoose"
import { IPolicy } from "../types/policy.types"

const policySchema = new mongoose.Schema<IPolicy>(
    {
        policyName:{
            type: String,
            trim: true
        },
        category: {
            type: String,
            enum: ["HR", "Security", "Compliance", "IT", "Finance"],
            default: "HR"
        },
        effectiveFrom: {
            type: Date
        },
        documentUrl: {
            type: String,
        },
        publicId: {
            type: String
        },
        status: {
            type: String,
            enum: ["Active", "Draft"],
            default: "Draft"
        }
    },{timestamps: true}
)
const Policy = mongoose.model("Policy", policySchema)
export default Policy