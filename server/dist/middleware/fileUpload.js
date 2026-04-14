"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure uploads folder exists
const uploadPath = "uploads/";
fs_1.default.mkdirSync(uploadPath, { recursive: true });
// Storage config
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s/g, "");
        cb(null, uniqueName);
    },
});
//  File filter (images + documents)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx/;
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const isImage = file.mimetype.startsWith("image");
    const isDocument = file.mimetype === "application/pdf" ||
        file.mimetype.includes("word") ||
        file.mimetype.includes("excel");
    if (extname && (isImage || isDocument)) {
        // ✅ Store type for size validation
        req.fileType = isImage ? "image" : "document";
        cb(null, true);
    }
    else {
        cb(new Error("Only images and documents are allowed"));
    }
};
//  Multer config (max 20MB overall)
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
});
exports.default = upload;
