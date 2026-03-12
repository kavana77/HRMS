import { z} from "zod"
export const adminSignupSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    companyName: z.string().min(2, "Company name is required"),
    email: z.string().email("Enter a valid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required")

}).refine((data)=> data.password === data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPassword"]
})
export const adminLoginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
})
export type AdminSignInType = z.infer<typeof adminSignupSchema>
export type AdminLoginType = z.infer<typeof adminLoginSchema>