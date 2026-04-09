import express from "express"
import { createPolicy, getPolicies } from "../controllers/policyController"
import { validateFileSize } from "../middleware/validateFileSize"
import upload from "../middleware/fileUpload"

const router = express.Router()

router.post("/create",upload.single("file"),validateFileSize, createPolicy)
router.get("/get", getPolicies )
export default router