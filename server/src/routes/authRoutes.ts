import express from "express"
import { adminLogin, adminSignup } from "../controllers/authController"

const router = express.Router()

router.post("/admin/signup", adminSignup)
router.post("/admin/login", adminLogin)

export default router