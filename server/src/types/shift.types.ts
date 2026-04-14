import mongoose, { Document } from "mongoose";

export interface Shift extends Document {
    companyId: mongoose.Types.ObjectId
    shiftName: string;
    shiftTime: string;
    endTime: string;
    isDefault: boolean
}