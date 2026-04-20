import express from "express"
import { getAttendanceSettings, upsertAttendanceSettings } from "../controllers/attendanceSettingsController"

const router = express.Router()

router.post("/create-settings",upsertAttendanceSettings)
router.get("/all-settings",getAttendanceSettings)
export default router