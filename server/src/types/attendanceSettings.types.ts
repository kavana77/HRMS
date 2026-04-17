import  mongoose, { Document } from "mongoose";

export interface IAttendanceSettings extends Document {
    companyId: mongoose.Types.ObjectId,
    trackingMethod: "Web" | "Mobile" | "Both";
    weeklyOff: string[];
    lateMarkAfter:number;
    allowRegularization: boolean;
    requireApprovalForLate: boolean;
    createdAt: Date;
    updatedAt: Date
}