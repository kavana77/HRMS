import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {loginSchema, type LoginSchemaType } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"

const LoginForm = ()=>{
    const {register,handleSubmit,formState:{errors, isSubmitting}}= useForm<LoginSchemaType>({
        resolver : zodResolver(loginSchema)
    })
    const onSubmit=(data:any)=>{
        console.log(data)
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
                className="
                w-full mt-6 mb-2 text-white text-md
                bg-[linear-gradient(135deg,#43ebf8_0%,#177af1_33%,#b768fd_66%,#fda052_100%)]
                hover:opacity-80 transition
                rounded-2xl cursor-pointer"
            >
            Login
            </Button>

        </form>
    )
}
export default LoginForm