import mongoose, { Document } from "mongoose";

export interface CompanyDocument extends Document {
    companyName: string;
    companyLogo: string;
    publicId: string;
    registeredAddress: string;
    pincode: string;
    state: string;
    country: string;
    adminId: mongoose.Types.ObjectId
    createdAt: Date;
    updatedAt: Date
}