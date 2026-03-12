import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Eye, EyeOff } from "lucide-react"
import Logo from "../../assets/magure-logo.png"
import type { AdminLoginType } from "@/lib/zodSchema"
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
type LoginProps = {
  onSubmit: (data: AdminLoginType) => void
  register: UseFormRegister<AdminLoginType>
  handleSubmit: UseFormHandleSubmit<AdminLoginType>
  errors: FieldErrors<AdminLoginType>
  isSubmitting: boolean
}

const LoginForm = ({onSubmit, register, handleSubmit, errors, isSubmitting}:LoginProps) => {
    const [showPassword, setShowPassword] = useState(false)
    return(
    <div>
      <div className="flex flex-col items-center mb-6">
        <img src={Logo} alt="logo" className="w-12 mb-3" />
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm text-gray-500 text-center">
          Sign in to manage your organization’s HR system.
        </p>
      </div>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <Label className="mb-2 block">
            Company's Email ID <span className="text-red-500">*</span>
          </Label>
          <Input
          {...register("email")}
            type="email"
            placeholder="you@company.com"   
          />
          
        </div>
        {errors?.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        {/* Password */}
        <div>
          <Label className="mb-2 block">
            Password <span className="text-red-500">*</span>
          </Label>

          <div className="relative">
            <Input
            {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"     
            />
             <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors?.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
          <div className="text-right mt-1">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        {/* Button */}
        <Button disabled={isSubmitting} className="w-full">{isSubmitting?"Loging...": "Log in"}</Button>

        {/* Signup */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Signup
          </span>
        </p>
      </form>
    </div>
    )
}
export default LoginForm