"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSettingsSchema = new mongoose_1.default.Schema({
    // companyId:{
    //     type: Schema.Types.ObjectId,
    //     ref: "Company",
    //     required: true,
    //     unique: true
    // }
    trackingMethod: {
        type: String,
        enum: ["Web", "Mobile", "Both"],
        default: "Web"
    },
    weeklyOff: {
        type: [String],
        default: ["Saturday", "Sunday"]
    },
    lateMarkAfter: {
        type: Number,
        default: 0,
        min: 0
    },
    allowRegularization: {
        type: Boolean,
        default: true
    },
    requireApprovalForLate: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const AttendanceSettings = mongoose_1.default.model("AttendanceSettings", attendanceSettingsSchema);
exports.default = AttendanceSettings;
