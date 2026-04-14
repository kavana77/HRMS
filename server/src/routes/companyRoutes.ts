import express from 'express'
import { createCompanyProfile } from '../controllers/companyController'
import upload from '../middleware/fileUpload'
import { validateFileSize } from '../middleware/validateFileSize'

const router = express.Router()

router.post("/setup-company",upload.single("image"),validateFileSize, createCompanyProfile)

export default router