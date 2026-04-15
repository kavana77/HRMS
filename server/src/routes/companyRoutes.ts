import express from 'express'
import { createCompanyProfile, getCompanyProfile } from '../controllers/companyController'
import upload from '../middleware/fileUpload'
import { validateFileSize } from '../middleware/validateFileSize'
import verifyToken from '../middleware/authMiddleware'

const router = express.Router()

router.post("/setup-company",verifyToken, upload.single("image"),validateFileSize, createCompanyProfile)
router.get("/get-company", verifyToken, getCompanyProfile)

export default router