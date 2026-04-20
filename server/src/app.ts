import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes'
import companyRoutes from "./routes/companyRoutes"
import holidayRoutes from "./routes/holidayRoutes"
import leaveRoutes from "./routes/leaveRoutes"
import policyRoutes from "./routes/policyRoutes"
import setupRoutes from "./routes/setupRoutes"
import shiftRoutes from "./routes/shiftRoutes"
import attendanceRoutes from "./routes/attendanceSettingsRoutes"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/holiday", holidayRoutes)
app.use("/api/leave", leaveRoutes)
app.use("/api/policy", policyRoutes)
app.use("/api/setup", setupRoutes)
app.use("/api/attendance",attendanceRoutes)
app.use("/api/shift", shiftRoutes)


export default app