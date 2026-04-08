import express from "express"
import { createLeaves, getLeaveById, getLeaves, updateLeave ,deleteLeave, updateLeaveStatus} from "../controllers/leaveController"

const router = express.Router()

router.post("/create", createLeaves)
router.get("/get-all", getLeaves)
router.get("/get/:id", getLeaveById)
router.put("/update/:id", updateLeave)
router.delete("/delete/:id", deleteLeave)
router.put("/update-status/:id", updateLeaveStatus)

export default router