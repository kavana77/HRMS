import { Document } from "mongoose";

export interface Leave extends Document {
    leaveName: string,
    leaveType: string,
    validityFrom: Date,
    validityTo: Date,
    creditedDays: number,
    resetType: string,
    resetDate: string,
    carryForward: boolean,
    encashUnused: boolean,
    createdAt: Date,
    updatedAt: Date
}