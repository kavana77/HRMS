"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
//Only admin can access this router
router.get('/admin', authMiddleware_1.default, (0, roleMiddleware_1.default)("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});
//Both admin and manager can access this router
router.get('/manager', authMiddleware_1.default, (0, roleMiddleware_1.default)("admin", "manager"), (req, res) => {
    res.json({ message: "Welcome Manager" });
});
//All can access this router
router.get('/employee', authMiddleware_1.default, (0, roleMiddleware_1.default)("admin", "manager", "employee"), (req, res) => {
    res.json({ message: "Welcome Employee" });
});
exports.default = router;
