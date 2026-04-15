import 'dotenv/config'
import {cleanEnv} from "envalid"
import {port, str} from "envalid/dist/validators"

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_URI: str(),
    JWT_SECRET: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY:str(),
    CLOUDINARY_API_SECRET: str(),
    CLOUDINARY_UPLOAD_FOLDER: str(),
    EMAIL_USER: str(),
    EMAIL_PASSWORD: str(),
})