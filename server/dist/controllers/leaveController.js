"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLeave = exports.updateLeave = exports.getLeaveById = exports.getLeaves = exports.createLeaves = void 0;
const Leave_1 = __importDefault(require("../models/Leave"));
const createLeaves = async (req, res) => {
    try {
        const { leaveName, leaveType, validityFrom, validityTo, creditedDays, resetType, resetDate, carryForward, encashUnused } = req.body;
        if (!leaveName ||
            !leaveType ||
            !validityFrom ||
            !validityTo ||
            creditedDays === undefined ||
            !resetType ||
            !resetDate) {
            return res.status(400).json({ message: "Missing required fields..." });
        }
        const newLeave = new Leave_1.default({
            leaveName,
            leaveType,
            validityFrom,
            validityTo,
            creditedDays,
            resetType,
            resetDate,
            carryForward,
            encashUnused
        });
        await newLeave.save();
        return res.status(201).json({ message: "Leave created successfully", data: newLeave });
    }
    catch (error) {
        console.error("Failed to add leave", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createLeaves = createLeaves;
const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: "Leaves fetched successfully", data: leaves });
    }
    catch (error) {
        console.error("Failed to get leaves", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getLeaves = getLeaves;
const getLeaveById = async (req, res) => {
    try {
        const leave = await Leave_1.default.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }
        return res.status(200).json({ message: "Leave fetched successfully", data: leave });
    }
    catch (error) {
        console.error("Failed to get leave by id", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getLeaveById = getLeaveById;
const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { leaveName, leaveType, validityFrom, validityTo, creditedDays, resetType, resetDate, carryForword, encashUnused } = req.body;
        const leave = await Leave_1.default.findById(id);
        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }
        const updatedLeave = await Leave_1.default.findByIdAndUpdate(id, { leaveName, leaveType, validityFrom, validityTo, creditedDays, resetType, resetDate, carryForword, encashUnused }, { new: true });
        return res.status(200).json({ message: "Leave updated successfully", data: updatedLeave });
    }
    catch (error) {
        console.error("Failed to update leave", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateLeave = updateLeave;
const deleteLeave = async (req, res) => {
    try {
        const deleted = await Leave_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Leave not found" });
        }
        return res.status(200).json({ message: "Leave deleted successfully" });
    }
    catch (error) {
        console.error("Failed to delete leave", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteLeave = deleteLeave;
