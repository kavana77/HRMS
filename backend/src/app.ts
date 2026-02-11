import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import attendanceRoutes from './routes/attendanceRoutes'

const app = express()


//Middleware
app.use(cors(
    {
        origin:[
            "http://localhost:5173",
            "https://hrms-sable-two.vercel.app/"
        ]
    }
))
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/attendance', attendanceRoutes )

export default app