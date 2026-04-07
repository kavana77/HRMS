"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holidayController_1 = require("../controllers/holidayController");
const router = express_1.default.Router();
router.post("/add", holidayController_1.addHoliday);
router.get("/get", holidayController_1.getHolidays);
router.put("/update/:id", holidayController_1.updateHoliday);
router.delete("/delete/:id", holidayController_1.deleteHoliday);
exports.default = router;
