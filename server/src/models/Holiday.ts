import mongoose from "mongoose";
import { Holiday } from "../types/holiday.types";

const holidaySchema = new mongoose.Schema<Holiday>(
    {
        holidayName: {
            type: String,
            required: true,
            trim: true
        },
        holidayDate:{
            type: Date,
            required: true
        }
    }
    ,{timestamps: true}
)
const Holiday = mongoose.model("Holiday", holidaySchema)
export default Holiday