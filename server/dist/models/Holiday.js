"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const holidaySchema = new mongoose_1.default.Schema({
    holidayName: {
        type: String,
        required: true,
        trim: true
    },
    holidayDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });
const Holiday = mongoose_1.default.model("Holiday", holidaySchema);
exports.default = Holiday;
