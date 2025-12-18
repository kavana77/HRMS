import mongoose from 'mongoose'
import env from '../utils/validateEnv'

const mongoUri = env.MONGO_URI

const connectDB = async ()=> {
    try {
        await mongoose.connect(mongoUri)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("MongoDB connection error ", error)
    }
}
export default connectDB


