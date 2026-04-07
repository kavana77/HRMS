import mongoose, {Schema} from "mongoose";
import {AdminInviteType} from "../types/admin.types"

const adminInviteSchema = new mongoose.Schema<AdminInviteType>(
    {
        fullName: {type: String, required: true},
        email: { type: String, required: true, unique: true},
        companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true},
        isVerified: { type: Boolean, default: false},
        inviteToken: String,
        inviteExpires: Date,
        
    },
    { timestamps: true }
)
const AdminInvite = mongoose.model("AdminInvite",adminInviteSchema)
export default AdminInvite