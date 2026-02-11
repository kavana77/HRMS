"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayAttendance = exports.punchOut = exports.punchIn = void 0;
const getTodayDate_1 = require("../utils/getTodayDate");
const Attendance_1 = __importDefault(require("../models/Attendance"));
const punchIn = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: user not found",
            });
        }
        const todayDate = (0, getTodayDate_1.getTodayDate)();
        const existingAttendance = await Attendance_1.default.findOne({
            userId,
            date: todayDate
        });
        if (existingAttendance) {
            return res.status(400).json({
                message: "Already punched in for today"
            });
        }
        const attendance = new Attendance_1.default({
            userId,
            date: todayDate,
            punchInTime: new Date(),
            status: "present",
        });
        return res.status(200).json({ message: "Punch-in successful", attendance });
    }
    catch (error) {
        console.error("Error in punchIn:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.punchIn = punchIn;
const punchOut = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const todayDate = (0, getTodayDate_1.getTodayDate)();
        const attendance = await Attendance_1.default.findOne({
            userId,
            date: todayDate
        });
        if (!attendance || !attendance.punchInTime) {
            return res.status(400).json({
                message: "You haven't punched in today"
            });
        }
        //prevent double punch out
        if (attendance.punchOutTime) {
            return res.status(400).json({
                message: "You have already puched out today"
            });
        }
        const punchOutTime = new Date();
        //calculate total minutes
        const diffMs = punchOutTime.getTime() - attendance.punchInTime.getTime();
        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        attendance.status = totalMinutes < 240 ? "HALF_DAY" : "present";
        //Update attendance record
        attendance.punchOutTime = punchOutTime;
        attendance.totalMinutesWorked = totalMinutes;
        await attendance.save();
        return res.status(200).json({
            message: "Punch out successfull",
            totalMinutes,
            attendance
        });
    }
    catch (error) {
        console.error("Error in punchOut:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.punchOut = punchOut;
const getTodayAttendance = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const todayDate = (0, getTodayDate_1.getTodayDate)();
        const attendance = await Attendance_1.default.findOne({
            userId,
            date: todayDate
        });
        if (!attendance) {
            return res.status(200).json({
                status: "NOT_PUNCHED"
            });
        }
        if (attendance.punchInTime && !attendance.punchOutTime) {
            return res.status(200).json({
                status: "PUNCHED_IN",
                punchInTime: attendance.punchInTime
            });
        }
        return res.status(200).json({
            status: "PUNCHED_OUT",
            punchInTime: attendance.punchInTime,
            punchOutTime: attendance.punchOutTime,
            totalMinutesWorked: attendance.totalMinutesWorked
        });
    }
    catch (error) {
        console.error("Error in getTodayAttendance: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getTodayAttendance = getTodayAttendance;
