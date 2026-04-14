import mongoose from "mongoose";
import { CompanyDocument} from "../types/company.types"

const companySchema = new mongoose.Schema<CompanyDocument>({
    companyName: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
    },
    publicId:{
        type: String
    },
    registeredAddress: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }
},{timestamps: true})
export default mongoose.model("Company", companySchema)