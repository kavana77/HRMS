import express from "express"
import { adminLogin, adminSignup, completeFirstLogin } from "../controllers/authController"

const router = express.Router()

router.post("/admin/signup", adminSignup)
router.post("/admin/login", adminLogin)
router.put("/complete-first-login",completeFirstLogin)

export default router