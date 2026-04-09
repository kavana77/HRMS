import { uploadToCloudinary } from "../config/cloudinary";
import fs from "fs"

export const cloudinaryUpload = async (file: Express.Multer.File) => {
    try {
        const resourceType = file.mimetype.startsWith("image")
            ? "image"
            : "raw";

        const response = await uploadToCloudinary(file.path, resourceType);

        return {
            url: response.secure_url,
            public_id: response.public_id,
        };
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw error;
    } finally {
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });
    }
};