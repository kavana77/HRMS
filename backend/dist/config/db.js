"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const mongoUri = validateEnv_1.default.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("MongoDB connection error ", error);
    }
};
exports.default = connectDB;
