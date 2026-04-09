import { Document } from "mongoose"
export interface IPolicy extends Document {
    policyName: string,
    category: string,
    effectiveFrom: Date,
    documentUrl: string,
    publicId: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
}