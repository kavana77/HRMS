import { useState } from "react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { Eye, EyeClosed } from "lucide-react"
import Logo from "../../../assets/magure-logo.png"
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import type { AdminSignUpType } from "@/lib/zodSchema"
import { Button } from "../../ui/button"

type SignupProps = {
  onSubmit: (data: AdminSignUpType) => void
  register: UseFormRegister<AdminSignUpType>
  handleSubmit: UseFormHandleSubmit<AdminSignUpType>
  errors: FieldErrors<AdminSignUpType>
  isSubmitting: boolean
}

const SignupForm = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  isSubmitting
}: SignupProps) => {

  const [phone, setPhone] = useState<string | undefined>()
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

      {/* Logo + Title */}
      <div className="flex flex-col justify-center items-center gap-1 mb-4">
        <img src={Logo} className="w-10" />
        <h1 className="text-center font-bold text-2xl">Welcome to Magure</h1>
        <p className="text-gray-400 text-[12px] text-center">
          This will be your admin login for managing the organization.
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="text-gray-500 text-sm">
          Full Name <span className="text-red-500">*</span>
        </label>

        <input
          {...register("fullName")}
          type="text"
          placeholder="e.g. John Doe"
          className="border w-full p-2 rounded-md text-sm"
        />
        {errors?.fullName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Company Name */}
      <div>
        <label className="text-gray-500 text-sm">
          Company Name <span className="text-red-500">*</span>
        </label>

        <input
          {...register("companyName")}
          type="text"
          placeholder="e.g. Company Pvt Ltd"
          className="border w-full p-2 rounded-md text-sm"
        />

        {errors?.companyName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-gray-500 text-sm">
          Company's Email ID <span className="text-red-500">*</span>
        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="you@company.com"
          className="border w-full p-2 rounded-md text-sm"
        />

        {errors?.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="text-gray-500 text-sm">
          Phone Number <span className="text-red-500">*</span>
        </label>

        <div className="flex items-center border border-input rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
          <PhoneInput
          {...register("phoneNumber")}
            value={phone}
            onChange={setPhone}
            defaultCountry="IN"
            international
            className="w-full focus:outline-none text-sm text-gray-500"
          />
        </div>

        {errors?.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-gray-500 text-sm">
          Password <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <input
            {...register("password")}
            type={passwordVisibility ? "text" : "password"}
            placeholder="Enter password"
            className="border w-full p-2 rounded-md pr-10 text-sm"
          />

          <button
            type="button"
            onClick={() => setPasswordVisibility((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {passwordVisibility ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeClosed className="w-4 h-4" />
            )}
          </button>
        </div>

        {errors?.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-gray-500 text-sm">
          Confirm Password <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={passwordVisibility ? "text" : "password"}
            placeholder="Confirm password"
            className="border w-full p-2 rounded-md pr-10 text-sm"
          />
        </div>

        {errors?.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <Button
          disabled={isSubmitting}
           className="w-full rounded-3xl cursor-pointer"
        >
          {isSubmitting ? "Creating..." : "Create an account"}
        </Button>

        <p className="text-gray-500 text-sm">
          Already have an account?{" "}
          <span className="text-[#3077F3] font-medium cursor-pointer">
            Log in
          </span>
        </p>
      </div>
    </form>
  )
}

export default SignupForm