"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgress = exports.completeStep = void 0;
const User_1 = __importDefault(require("../models/User"));
const stepWeights = {
    "attendance-settings": 10,
    "shift": 10,
    "leave": 10,
    "holiday": 10,
    "policy": 20
};
const completeStep = async (req, res) => {
    try {
        const adminId = req.user?.id;
        const { step } = req.body;
        if (!adminId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!stepWeights[step]) {
            return res.status(400).json({ message: "Invalid step" });
        }
        await User_1.default.findByIdAndUpdate(adminId, {
            $addToSet: { completedSteps: step }
        });
        return res.status(200).json({ message: "Step completed" });
    }
    catch (error) {
        console.error("Error completing step", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.completeStep = completeStep;
const getProgress = async (req, res) => {
    try {
        const adminId = req.user?.id;
        const user = await User_1.default.findById(adminId);
        const completedSteps = user?.completedSteps || [];
        const progress = completedSteps.reduce((total, step) => {
            return total + (stepWeights[step] || 0);
        }, 0);
        return res.status(200).json({ completedSteps, progress });
    }
    catch (error) {
        console.error("Error fetching progress", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
exports.getProgress = getProgress;
