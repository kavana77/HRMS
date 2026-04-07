"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const validateEnv_1 = __importDefault(require("./validateEnv"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: validateEnv_1.default.EMAIL_USER,
        pass: validateEnv_1.default.EMAIL_PASSWORD
    }
});
const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: validateEnv_1.default.EMAIL_USER,
        to,
        subject,
        text,
        html
    };
    console.log("Sending email to ", to);
    await transporter.sendMail(mailOptions);
    console.log("Email sent to ", to);
};
exports.sendEmail = sendEmail;
