import express from 'express'
import { getTodayAttendance, punchIn, punchOut } from '../controllers/attendanceController'
import verifyToken from '../middleware/authMiddleware'

const router = express.Router()

router.post('/punch-in',verifyToken, punchIn)
router.post('/punch-out',verifyToken, punchOut)
router.get('/my-attendance', verifyToken, getTodayAttendance)

export default router