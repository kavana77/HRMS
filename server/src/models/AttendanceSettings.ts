import mongoose, { Schema } from "mongoose";
import { IAttendanceSettings } from "../types/attendanceSettings.types";

const attendanceSettingsSchema = new mongoose.Schema<IAttendanceSettings>(
    {
        companyId:{
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true,
            unique: true
        },
        trackingMethod:{
            type: String,
            enum: ["Web","Mobile","Both"],
            default:"Web"
        },
        weeklyOff:{
            type: [String],
            default: ["Saturday","Sunday"]
        },
        lateMarkAfter:{
            type: Number,
            default:0,
            min:0
        },
        allowRegularization: {
            type: Boolean,
            default: true
        },
        requireApprovalForLate:{
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)
const AttendanceSettings = mongoose.model("AttendanceSettings", attendanceSettingsSchema)
export default AttendanceSettings