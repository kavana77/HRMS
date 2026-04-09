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

export const companysetupForm = z.object({
    companyName: z.string().trim().min(2, "Company name must be at least 2 characters"),
    companyLogo: z.string().url("Invalig logo URL").optional(),
    address: z.string().trim().min(5, "Address must be at least 5 charaters"),
    pincode: z.string().regex(/^[0-9]{6}$/,"Pincode must be 6 digits"),
    state: z.string().trim().min(2, "State is required"),
    country: z.string().trim().min(2, "Country is required")
})



const dateSchema = z.string().refine(
  (date) => !isNaN(Date.parse(date)),
  { message: "Invalid date format" }
)

export const leaveTypeSchema = z.object({
  leaveName: z.string().trim().min(2, "Leave name must be at least 2 characters"),

 leaveType: z.enum(["Paid", "Unpaid"], {
  message: "Leave type must be Paid or Unpaid"
}),

  validityFrom: dateSchema,
  validityTo: dateSchema,

  creditedDays: z.coerce.number().min(0, "Credited days must be a non-negative number"),

resetType: z.enum(["Monthly", "Yearly", "None"], {
  message: "Reset type must be Monthly, Yearly or None"
}),

  resetDate: dateSchema,
  status: z.enum(["Active", "Inactive"]),
  carryForward: z.boolean().optional(),
  encashUnused: z.boolean().optional()
})
.refine((data) => new Date(data.validityTo) >= new Date(data.validityFrom), {
  message: "Validity To must be after Validity From",
  path: ["validityTo"]
})
export type LeaveResponseType = LeaveTypeType & {
  _id: string
}
export const policySchema = z.object({
    policyName: z.string().trim().min(2, "Policy name must be at least 2 characters"),
    category: z.enum(["HR", "Finance", "IT", "Security", "Compliance"], {
        message: "Category must be one"
    }),
    effectiveFrom: dateSchema,
    documentUrl: z.string().url().optional(),
    publicId: z.string().optional(),
    status: z.enum(["Active", "Draft"])
})

export type AdminSignUpType = z.infer<typeof adminSignupSchema>
export type AdminLoginType = z.infer<typeof adminLoginSchema>
export type CompanysetupForm = z.infer<typeof companysetupForm>
export type LeaveTypeType = z.infer<typeof leaveTypeSchema>
export type PolicyType = z.infer<typeof policySchema>