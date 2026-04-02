import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes'
import companyRouter from "./routes/companyRoutes"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/company", companyRouter)


export default app