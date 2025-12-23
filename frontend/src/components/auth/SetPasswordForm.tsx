import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {setPasswordSchema, type SetPasswordSchemaType } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"

const SetPasswordForm = ()=>{
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<SetPasswordSchemaType>({
        resolver: zodResolver(setPasswordSchema)
    })
    const onSubmit = (data: any)=>{
        console.log("Set password data", data)
    }
    return(
        <form className="space-y-3 p-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="font-medium text-gray-600">New Password</label>
                <Input 
                type="password"
                placeholder="New Password"
                {...register("password")}
                className="bg-white rounded-md"/>
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
            </div>
            <div>
                <label className="font-medium text-gray-600">Confirm Password</label>
                <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="bg-white rounded-md"/>
                {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>
            <Button
                className="
                w-full mt-6 mb-2 text-white text-md
                bg-[linear-gradient(135deg,#43ebf8_0%,#177af1_33%,#b768fd_66%,#fda052_100%)]
                hover:opacity-80 transition
                rounded-2xl cursor-pointer" disabled={isSubmitting}>Set Password</Button>
        </form>
    )
}
export default SetPasswordForm