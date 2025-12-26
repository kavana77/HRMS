import app from "./app"
import connectDB from "./config/db"
import env from "../src/utils/validateEnv"

console.log("JWT_SECRET AT RUNTIME:", env.JWT_SECRET);

const PORT = env.PORT || 3001
connectDB().then(()=>{
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
})