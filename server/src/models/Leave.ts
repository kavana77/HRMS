import mongoose from "mongoose";
import {Leave} from "../types/leave.types"

const leaveSchema = new mongoose.Schema<Leave>(
    {
        leaveName: {
            type: String,
            required: true,
            trim: true
        },
        leaveType: {
            type: String,
            required: true,
            // enum: ["sick", "casual", "earned", "maternity", "paternity", "bereavement", "unpaid", "other"]
        },
        validityFrom: {
            type: Date,
            required: true
        },
        validityTo: {
            type: Date,
            required: true
        },
        creditedDays: {
            type: Number,
            required: true,
            min: 0
        },
        resetType:{
            type: String,
            required: true,
            // enum: ["monthly", "yearly", "none"]
            // default: "none"
        },
        resetDate: {
            type: String,
        },
        carryForward: {
            type: Boolean,
            default: false
        },
        encashUnused: {
            type: Boolean,
            default: false
        },
        status:{
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {timestamps: true}
)
const Leave = mongoose.model("Leave", leaveSchema)
export default Leave