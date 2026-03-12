import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Eye, EyeOff } from "lucide-react"
import Logo from "../../assets/magure-logo.png"


const LoginForm = () => {
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
       <form  className="space-y-5">
        {/* Email */}
        <div>
          <Label className="mb-2 block">
            Company's Email ID <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="you@company.com"   
          />
        </div>
        {/* Password */}
        <div>
          <Label className="mb-2 block">
            Password <span className="text-red-500">*</span>
          </Label>

          <div className="relative">
            <Input
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
        <Button className="w-full">Log in</Button>

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