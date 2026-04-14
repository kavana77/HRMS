import { RequestHandler } from "express";
import AttendanceSettings from "../models/AttendanceSettings";

export const upsertAttendanceSettings:RequestHandler = async(req ,res)=>{
    try {
        const { trackingMethod, weeklyOff, 
            lateMarkAfterMinutes, allowRegularization,
            requireApprovalForLate} = req.body;
        // const companyId= req.user.companyId;
        if(!trackingMethod){
            return res.status(400).json({message: "Tracking method is required"})
        }
        const allowedMethod =["Web","Mobile","Both"]
        if(!allowedMethod.includes(trackingMethod)){
            return res.status(400).json({message: "Invalid tracking method"})
        }
        if(lateMarkAfterMinutes !== undefined && lateMarkAfterMinutes <0){
            return res.status(400).json({message: "Late mark minutes cannot be negative"})
        }
        const settings = await AttendanceSettings.findOneAndUpdate(
            // {companyId},
            {
                trackingMethod,
                weeklyOff,
                lateMarkAfterMinutes,
                allowRegularization,
                requireApprovalForLate
            },
            {new: true, upsert: true}
        )
        return res.status(200).json({message: "Attendance settings saved successfully", data: settings})
    } catch (error) {
        console.error("Failed to upsert Attence Settings", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getAttendanceSettings:RequestHandler= async(req ,res)=>{
    try {
        // const companyId = req.user.companyId
        const settings = await AttendanceSettings.findOne({
            // companyId
        })
        if(!settings){
            return res.status(400).json({message: "No attendance settings found"})
        }
        return res.status(200).json({
            data: settings
        })

    } catch (error) {
        console.error("Failed to get attendance details", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}