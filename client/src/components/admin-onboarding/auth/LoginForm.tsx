import { useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { AlertTriangle, Eye, EyeOff } from "lucide-react"
import Logo from "../../../assets/magure-logo.png"
import type { AdminLoginType } from "@/lib/zodSchema"
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { Link } from "react-router-dom"
type LoginProps = {
  onSubmit: (data: AdminLoginType) => void
  register: UseFormRegister<AdminLoginType>
  handleSubmit: UseFormHandleSubmit<AdminLoginType>
  errors: FieldErrors<AdminLoginType>
  isSubmitting: boolean
  apiError?: string | null
  setApiError: (value: string | null) => void
}

const LoginForm = ({onSubmit, register, handleSubmit, errors, isSubmitting, apiError,setApiError}:LoginProps) => {
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
      {apiError && (
  <div className="bg-red-100 mb-4 relative text-red-600 px-4 py-2 rounded-md text-sm flex  items-center">
    <AlertTriangle className="h-4 w-4 mr-3"/>
    <span>{apiError}</span>
    <button onClick={() => setApiError(null)} className="absolute right-4  cursor-pointer">✕</button>
  </div>
)}
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
        <Button  type="submit" disabled={isSubmitting} className="w-full cursor-pointer">{isSubmitting?"Loging...": "Log in"}</Button>

        {/* Signup */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/admin/signup" className="text-blue-600 cursor-pointer hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
    )
}
export default LoginForm