import express from "express"
import { addHoliday, deleteHoliday, getHolidays, updateHoliday } from "../controllers/holidayController"
const router = express.Router()

router.post("/add", addHoliday)
router.get("/get", getHolidays)
router.put("/update/:id", updateHoliday)
router.delete("/delete/:id", deleteHoliday)
export default router