import express from 'express'
import { getTodayAttendance, punchIn, punchOut } from '../controllers/attendanceController'

const router = express.Router()

router.post('/punch-in', punchIn)
router.post('/punch-out', punchOut)
router.get('/my-attendance', getTodayAttendance)

export default router