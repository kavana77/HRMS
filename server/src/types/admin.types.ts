import mongoose from "mongoose";

export interface AdminInviteType extends Document {
    fullName: string;
    email: string;
    companyId: mongoose.Types.ObjectId;
    isVerified: boolean;
    inviteToken?: string;
    inviteExpires?: Date;
}