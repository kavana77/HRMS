"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
console.log("JWT_SECRET AT RUNTIME:", validateEnv_1.default.JWT_SECRET);
const PORT = validateEnv_1.default.PORT || 3001;
(0, db_1.default)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});
