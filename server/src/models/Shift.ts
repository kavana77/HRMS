import mongoose, { Schema } from "mongoose";
import {Shift }from "../types/shift.types"
''
const shiftSchema = new mongoose.Schema<Shift>(
    {
        // companyId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Company",
        //     required: true
        // },
        shiftName:{
            type: String,
            required: true,
            trim:true
        },
        shiftTime:{
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        isDefault: {
            type: Boolean
        }
    },
    {timestamps: true}
)
const Shift = mongoose.model("Shift", shiftSchema)
export default Shift