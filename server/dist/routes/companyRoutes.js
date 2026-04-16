"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controllers/companyController");
const fileUpload_1 = __importDefault(require("../middleware/fileUpload"));
const validateFileSize_1 = require("../middleware/validateFileSize");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/setup-company", authMiddleware_1.default, fileUpload_1.default.single("image"), validateFileSize_1.validateFileSize, companyController_1.createCompanyProfile);
router.get("/get-company", authMiddleware_1.default, companyController_1.getCompanyProfile);
exports.default = router;
