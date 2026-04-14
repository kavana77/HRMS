"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const policyController_1 = require("../controllers/policyController");
const validateFileSize_1 = require("../middleware/validateFileSize");
const fileUpload_1 = __importDefault(require("../middleware/fileUpload"));
const router = express_1.default.Router();
router.post("/create", fileUpload_1.default.single("file"), validateFileSize_1.validateFileSize, policyController_1.createPolicy);
router.get("/get", policyController_1.getPolicies);
router.delete("/delete/:id", policyController_1.deletePolicy);
exports.default = router;
