import { RequestHandler } from "express";
import Leave from "../models/Leave";

export const createLeaves:RequestHandler = async (req, res)=> {
    try {
        const {leaveName, leaveType, validityFrom, validityTo, creditedDays, resetType, resetDate, carryForward, encashUnused} = req.body;
        if (
  !leaveName ||
  !leaveType ||
  !validityFrom ||
  !validityTo ||
  creditedDays === undefined ||
  !resetType ||
  !resetDate
) {
  return res.status(400).json({ message: "Missing required fields..." });
}
        const newLeave = new Leave({
            leaveName,
            leaveType,
            validityFrom,
            validityTo,
            creditedDays,
            resetType,
            resetDate,
            carryForward,
            encashUnused
        })
        await newLeave.save()
        return res.status(201).json({message: "Leave created successfully", data: newLeave})
    } catch (error) {
        console.error("Failed to add leave", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getLeaves:RequestHandler = async (req, res)=> {
    try {
        const leaves = await Leave.find().sort({ createdAt: -1 })
        return res.status(200).json({message: "Leaves fetched successfully", data: leaves})
    } catch (error) {
        console.error("Failed to get leaves", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getLeaveById:RequestHandler = async (req ,res) => {
    try {
        const leave = await Leave.findById(req.params.id)
        if(!leave){
            return res.status(404).json({message: "Leave not found"})
        }
        return res.status(200).json({message: "Leave fetched successfully", data: leave})

    } catch (error) {
        console.error("Failed to get leave by id", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}
export const updateLeave:RequestHandler = async(req , res) =>{
    try {
        const {id} = req.params
        const {leaveName, leaveType, validityFrom, validityTo, creditedDays, resetType, resetDate, carryForword, encashUnused} = req.body;
        const leave = await Leave.findById(id)
        if(!leave){
            return res.status(404).json({message: "Leave not found"})
        }
        const updatedLeave = await Leave.findByIdAndUpdate(id, {leaveName, leaveType, validityFrom, validityTo, creditedDays, resetType, resetDate, carryForword, encashUnused}, {new: true})
        return res.status(200).json({message: "Leave updated successfully", data: updatedLeave})
    } catch (error) {
        console.error("Failed to update leave", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteLeave:RequestHandler = async(req, res)=> {
    try {
        const deleted = await Leave.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({message: "Leave not found"})
        }
        return res.status(200).json({message: "Leave deleted successfully"})
    } catch (error) {
        console.error("Failed to delete leave", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}