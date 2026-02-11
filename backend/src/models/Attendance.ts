import mongoose, { Schema, Document } from "mongoose";

export interface AttendanceDocument extends Document {
    userId: mongoose.Types.ObjectId;
    date: string;
    punchInTime?: Date;
    punchOutTime?: Date;
    totalMinutesWorked?: number;
    status:
    | "PRESENT"
    | "ABSENT"
    | "HALF_DAY"
    | "LEAVE"
    | "HOLIDAY"
    | "WEEKEND";
    workMode: "remote" | "office" | "hybrid";
    location?: {
        latitude: number;
        longitude: number;
    }
}

const attendanceSchema = new Schema<AttendanceDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    date: {
        type: String,
        required: true,
        index: true
    },
    punchInTime: {
        type: Date,
    },
    punchOutTime: {
        type: Date,
    },
    totalMinutesWorked: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["PRESENT",
            "ABSENT",
            "HALF_DAY",
            "LEAVE",
            "HOLIDAY",
            "WEEKEND"],
        default: "ABSENT",
    },
    workMode: {
        type: String,
        enum: ["remote", "office", "hybrid"],
        default: "office"
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
},
    {
        timestamps: true
    })
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true })

export default mongoose.model<AttendanceDocument>("Attendance", attendanceSchema)