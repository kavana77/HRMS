"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const companySchema = new mongoose_1.default.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }
});
exports.default = mongoose_1.default.model("Company", companySchema);
