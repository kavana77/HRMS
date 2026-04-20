import express from "express"
import { createShift, deleteShift, getShifts, updateShift } from "../controllers/shiftController"

const router = express.Router()

router.post('/creat', createShift)
router.get('/get-all', getShifts)
router.put('/update', updateShift)
router.delete('/delete',deleteShift)

export default router