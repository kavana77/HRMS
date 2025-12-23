import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const setPasswordSchema = z.object({
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string()
})
.refine((data)=> data.password === data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type LoginSchemaType = z.infer<typeof loginSchema>
export type SetPasswordSchemaType = z.infer<typeof setPasswordSchema>