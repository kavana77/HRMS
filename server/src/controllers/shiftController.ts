import { RequestHandler } from "express";
import Shift from "../models/Shift";
import mongoose from "mongoose";

// CREATE SHIFT
export const createShift: RequestHandler = async (req, res) => {
    try {
        const { shiftName, shiftTime, endTime, isDefault } = req.body;
        const companyId = req.user?.companyId;

        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!shiftName || !shiftTime || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Handle default logic
        if (isDefault) {
            await Shift.updateMany(
                { companyId },
                { $set: { isDefault: false } }
            );
        }

        const newShift = await Shift.create({
            companyId,
            shiftName,
            shiftTime,
            endTime,
            isDefault: isDefault || false,
        });

        return res.status(201).json({
            message: "Shift created successfully",
            data: newShift,
        });
    } catch (error) {
        console.error("Failed to create Shift", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET ALL SHIFTS
export const getShifts: RequestHandler = async (req, res) => {
    try {
        const companyId = req.user?.companyId;

        const shifts = await Shift.find({ companyId }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Shifts fetched successfully",
            data: shifts,
        });
    } catch (error) {
        console.error("Failed to fetch shifts", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//  GET SHIFT BY ID
export const getShiftById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.user?.companyId;

        const shift = await Shift.findOne({ _id: id, companyId });

        if (!shift) {
            return res.status(404).json({ message: "Shift not found" });
        }

        return res.status(200).json({
            message: "Shift fetched successfully",
            data: shift,
        });
    } catch (error) {
        console.error("Failed to fetch shift by ID", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//  UPDATE SHIFT
export const updateShift: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { shiftName, shiftTime, endTime, isDefault } = req.body;
        const companyId = req.user?.companyId;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        if (!companyId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // If updating to default → reset others
        const objectId = new mongoose.Types.ObjectId(id);

        if (isDefault) {
            await Shift.updateMany(
                { companyId, _id: { $ne: objectId } }, // ✅ FIXED
                { $set: { isDefault: false } }
            );
        }

        const updatedShift = await Shift.findOneAndUpdate(
            { _id: id, companyId },
            {
                shiftName,
                shiftTime,
                endTime,
                isDefault,
            },
            { new: true }
        );

        if (!updatedShift) {
            return res.status(404).json({ message: "Shift not found" });
        }

        return res.status(200).json({
            message: "Shift updated successfully",
            data: updatedShift,
        });
    } catch (error) {
        console.error("Shift update failed", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//  DELETE SHIFT
export const deleteShift: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.user?.companyId;

        const deletedShift = await Shift.findOneAndDelete({
            _id: id,
            companyId,
        });

        if (!deletedShift) {
            return res.status(404).json({ message: "Shift not found" });
        }

        return res.status(200).json({
            message: "Shift deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete shift", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};