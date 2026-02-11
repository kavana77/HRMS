"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    try {
        // const decoded = jwt.verify(token, env.JWT_SECRET) as UserPayload;
        const decoded = jsonwebtoken_1.default.verify(token, validateEnv_1.default.JWT_SECRET);
        console.log("DECODED WITHOUT VERIFY:", decoded);
        req.user = decoded;
        console.log("TOKEN:", token);
        console.log("DECODED:", decoded);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
exports.default = verifyToken;
