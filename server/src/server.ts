import app from "./app"
import connectDB from "./config/db"
import env from "./utils/validateEnv"

const PORT = env.PORT || 4001
connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})