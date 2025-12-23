import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'

const app = express()


//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app