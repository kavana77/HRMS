import express from "express"
import { createPolicy, deletePolicy, getPolicies, updatePolicy} from "../controllers/policyController"
import { validateFileSize } from "../middleware/validateFileSize"
import upload from "../middleware/fileUpload"

const router = express.Router()

router.post("/create",upload.single("file"),validateFileSize, createPolicy)
router.get("/get", getPolicies)
router.delete("/delete/:id",deletePolicy)
router.put('/update/:id', updatePolicy)
export default router