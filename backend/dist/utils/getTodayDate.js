"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayDate = void 0;
const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
};
exports.getTodayDate = getTodayDate;
