import express from "express"
import { adminSignup } from "../controllers/authController"

const router = express.Router()

router.post("/admin/signup", adminSignup)

export default router