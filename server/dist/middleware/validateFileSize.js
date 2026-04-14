"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileSize = void 0;
const validateFileSize = (req, res, next) => {
    if (!req.file)
        return next();
    const fileSize = req.file.size;
    const fileType = req.fileType;
    // 2MB for images
    if (fileType === "image" && fileSize > 2 * 1024 * 1024) {
        return res.status(400).json({
            message: "Image should not exceed 2MB",
        });
    }
    // 20MB for documents
    if (fileType === "document" && fileSize > 20 * 1024 * 1024) {
        return res.status(400).json({
            message: "Document should not exceed 20MB",
        });
    }
    next();
};
exports.validateFileSize = validateFileSize;
