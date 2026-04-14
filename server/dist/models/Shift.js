"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
'';
const shiftSchema = new mongoose_1.default.Schema({
    // companyId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Company",
    //     required: true
    // },
    shiftName: {
        type: String,
        required: true,
        trim: true
    },
    shiftTime: {
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
}, { timestamps: true });
const Shift = mongoose_1.default.model("Shift", shiftSchema);
exports.default = Shift;
