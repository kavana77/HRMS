import express from 'express'
import { createCompanyProfile } from '../controllers/companyController'

const router = express.Router()

router.post("/setup-company", createCompanyProfile)

export default router