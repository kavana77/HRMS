"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        console.log("ROLE FROM TOKEN:", req.user?.role);
        console.log("ALLOWED ROLES:", allowedRoles);
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
exports.default = authorizeRoles;
