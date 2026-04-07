import nodemailer from "nodemailer"
import env from "./validateEnv"
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD
    } 
})
export const sendEmail = async(to: string, subject: string, text: string,html?: string)=>{
    const mailOptions ={
        from: env.EMAIL_USER,
        to,
        subject,
        text,
        html
    }
    console.log("Sending email to ", to)
    await transporter.sendMail(mailOptions)
    console.log("Email sent to ", to)
}