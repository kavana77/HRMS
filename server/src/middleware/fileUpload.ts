import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadPath = "uploads/";
fs.mkdirSync(uploadPath, { recursive: true });

// Storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s/g, "");
    cb(null, uniqueName);
  },
});

//  File filter (images + documents)
const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {
  const allowedTypes =
    /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const isImage = file.mimetype.startsWith("image");

  const isDocument =
    file.mimetype === "application/pdf" ||
    file.mimetype.includes("word") ||
    file.mimetype.includes("excel");

  if (extname && (isImage || isDocument)) {
    // Store type for size validation
    (req as any).fileType = isImage ? "image" : "document";

    cb(null, true);
  } else {
    cb(new Error("Only images and documents are allowed"));
  }
};

//  Multer config (max 20MB overall)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

export default upload;