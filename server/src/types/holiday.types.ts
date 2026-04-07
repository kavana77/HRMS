import { Document } from "mongoose"
export interface Holiday extends Document {
    holidayName: string,
    holidayDate: Date,
    createdAt: Date,
    updatedAt: Date
}