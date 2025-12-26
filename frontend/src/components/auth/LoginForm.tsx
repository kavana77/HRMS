import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {loginSchema, type LoginSchemaType } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { loginApi } from "@/utils/http"
import { Link, useNavigate } from "react-router-dom"

const LoginForm = ()=>{
    const navigate = useNavigate()
    const {register,handleSubmit,formState:{errors, isSubmitting}}= useForm<LoginSchemaType>({
        resolver : zodResolver(loginSchema)
    })
    const {mutateAsync} = useMutation({
        mutationFn: loginApi
    })
    const onSubmit=async(data:LoginSchemaType)=>{
        try {
            const res = await mutateAsync(data)
            localStorage.setItem("token", res.token)
            localStorage.setItem("role", res.role)
            // role-based redirection
            if(res.role === "admin"){
                navigate("/admin/dashboard")
            }else if(res.role === "manager"){
                navigate("/manager/dashboard")
            }else if(res.role === "employee"){
                navigate("/employee/dashboard")
            }
            console.log("Logged in Successfully",data)
            
        } catch (error) {
            console.error("Failed to login", error)
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4">
            <div>
                <label className="font-medium text-gray-600">Email</label>
                <Input className="bg-white rounded-md"
                {...register("email")}
                type="email"
                placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-400">Email is required</p>}
            </div>
            <div>
                <label className="font-medium text-gray-600">Password</label>
                <Input className="bg-white rounded-md"
                {...register("password")}
                type="password"
                placeholder="Enter your password"/>
                {errors.password && <p className="text-red-400">Please enter the correct password</p>}
            </div>
           <Button
            type="submit"
            disabled={isSubmitting}
                className="
                w-full mt-6 mb-2 text-white text-md
                bg-[linear-gradient(135deg,#43ebf8_0%,#177af1_33%,#b768fd_66%,#fda052_100%)]
                hover:opacity-80 transition
                rounded-2xl cursor-pointer"
            >
                {isSubmitting ? "Logging..." : "Login"}
            </Button>
            <Link to="/set-password" className="underline text-blue-600 pl-60 hover:opacity-50">forgot password</Link>
        </form>
    )
}
export default LoginForm