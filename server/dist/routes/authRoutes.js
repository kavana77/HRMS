"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/admin/signup", authController_1.adminSignup);
router.post("/admin/login", authController_1.adminLogin);
router.put("/complete-first-login", authMiddleware_1.default, authController_1.completeFirstLogin);
exports.default = router;
