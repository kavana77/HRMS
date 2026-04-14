"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leaveSchema = new mongoose_1.default.Schema({
    leaveName: {
        type: String,
        required: true,
        trim: true
    },
    leaveType: {
        type: String,
        required: true,
        // enum: ["sick", "casual", "earned", "maternity", "paternity", "bereavement", "unpaid", "other"]
    },
    validityFrom: {
        type: Date,
        required: true
    },
    validityTo: {
        type: Date,
        required: true
    },
    creditedDays: {
        type: Number,
        required: true,
        min: 0
    },
    resetType: {
        type: String,
        required: true,
        // enum: ["monthly", "yearly", "none"]
        // default: "none"
    },
    resetDate: {
        type: String,
    },
    carryForward: {
        type: Boolean,
        default: false
    },
    encashUnused: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, { timestamps: true });
const Leave = mongoose_1.default.model("Leave", leaveSchema);
exports.default = Leave;
