"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const policySchema = new mongoose_1.default.Schema({
    policyName: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ["HR", "Security", "Compliance", "IT", "Finance"],
        default: "HR"
    },
    effectiveFrom: {
        type: Date
    },
    documentUrl: {
        type: String,
    },
    publicId: {
        type: String
    },
    status: {
        type: String,
        enum: ["Active", "Draft"],
        default: "Draft"
    }
}, { timestamps: true });
const Policy = mongoose_1.default.model("Policy", policySchema);
exports.default = Policy;
