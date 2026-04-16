import express from "express"
import { adminLogin, adminSignup, completeFirstLogin } from "../controllers/authController"
import verifyToken from '../middleware/authMiddleware'

const router = express.Router()

router.post("/admin/signup", adminSignup)
router.post("/admin/login", adminLogin)
router.put("/complete-first-login",verifyToken ,completeFirstLogin)

export default router