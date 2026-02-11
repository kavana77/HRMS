import { RequestHandler } from "express";
import { getTodayDate } from "../utils/getTodayDate";
import Attendance from "../models/Attendance";


export const punchIn: RequestHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: user not found",
            });
        }
        const todayDate = getTodayDate();

        const existingAttendance = await Attendance.findOne({
            userId,
            date: todayDate
        })
        if (existingAttendance) {
            return res.status(400).json({
                message: "Already punched in for today"
            })
        }

        const attendance = new Attendance({
            userId,
            date: todayDate,
            punchInTime: new Date(),
            status: "PRESENT",
        })
        await attendance.save()
        return res.status(201).json({ message: "Punch-in successful", attendance });
    } catch (error) {
        console.error("Error in punchIn:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const punchOut: RequestHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const todayDate = getTodayDate()
        const attendance = await Attendance.findOne({
            userId,
            date: todayDate
        })
        if(!attendance || !attendance.punchInTime){
            return res.status(400).json({
                message: "You haven't punched in today"
            })
        }
        //prevent double punch out
        if(attendance.punchOutTime){
            return res.status(400).json({
                message: "You have already punched out today"
            })
        }
        const punchOutTime = new Date()

        //calculate total minutes
        const diffMs = punchOutTime.getTime() - attendance.punchInTime.getTime()
        const totalMinutes = Math.floor(diffMs / (1000 * 60))
attendance.status = totalMinutes < 240 
  ? "HALF_DAY" 
  : "PRESENT";
        //Update attendance record
        attendance.punchOutTime = punchOutTime;
        attendance.totalMinutesWorked = totalMinutes
        await attendance.save()

        return res.status(200).json({
            message: "Punch out successfull",
            totalMinutesWorked: attendance.totalMinutesWorked,
            attendance
        })
    } catch (error) {
        console.error("Error in punchOut:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getTodayAttendance: RequestHandler = async (req , res) =>{
    try {
        const userId = req.user?.id;
        if(!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const todayDate = getTodayDate()
        const attendance = await Attendance.findOne({
            userId,
            date: todayDate
        })
        if(!attendance){
            return res.status(200).json({
                status: "NOT_PUNCHED"
            })
        }
        if(attendance.punchInTime && !attendance.punchOutTime){
            return res.status(200).json({
                status: "PUNCHED_IN",
                punchInTime: attendance.punchInTime
            })
        }
        return res.status(200).json({
            status: "PUNCHED_OUT",
            punchInTime: attendance.punchInTime,
            punchOutTime: attendance.punchOutTime,
            totalMinutesWorked: attendance.totalMinutesWorked
        })
    } catch (error) {
        console.error("Error in getTodayAttendance: ", error)
        return res.status(500).json({ message: "Internal Server Error"})
    }
}