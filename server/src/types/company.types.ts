import mongoose, { Document } from "mongoose";

export interface CompanyDocument extends Document {
    companyName: string;
    companyLogo: string;
    address: string;
    pincode: string;
    state: string;
    country: string;
    adminId: mongoose.Types.ObjectId
}