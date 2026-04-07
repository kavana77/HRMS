"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaveController_1 = require("../controllers/leaveController");
const router = express_1.default.Router();
router.post("/create", leaveController_1.createLeaves);
router.get("/get-all", leaveController_1.getLeaves);
router.get("/get/:id", leaveController_1.getLeaveById);
router.put("/update/:id", leaveController_1.updateLeave);
router.delete("/delete/:id", leaveController_1.deleteLeave);
exports.default = router;
