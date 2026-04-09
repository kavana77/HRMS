import express from "express"
import { createPolicy } from "../controllers/policyController"
import { validateFileSize } from "../middleware/validateFileSize"
import upload from "../middleware/fileUpload"

const router = express.Router()

router.post("/create",upload.single("file"),validateFileSize, createPolicy)
export default router