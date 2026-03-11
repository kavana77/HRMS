import {Document} from "mongoose"
export interface User extends Document {
    fullName: string,
    companyName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: "admin"
}