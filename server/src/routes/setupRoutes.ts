import express from "express"
import verifyToken from "../middleware/authMiddleware"
import { completeStep, getProgress } from "../controllers/setupController"


const router = express.Router()

router.put("/completed-step", verifyToken, completeStep)
router.get("/progress", verifyToken, getProgress)

export default router