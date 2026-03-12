import LoginForm from "@/components/admin-onboarding/LoginForm"
import { adminLoginSchema,type AdminLoginType } from "@/lib/zodSchema"
import { adminLogin} from "@/utils/http"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const LoginPage = () =>{
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<AdminLoginType>({
        resolver: zodResolver(adminLoginSchema)
    })
    const {mutateAsync} = useMutation({
        mutationFn: adminLogin
    })
    const onSubmit = async (data: AdminLoginType)=>{
        try {
            const res = await mutateAsync(data)
            localStorage.setItem("token", res.token)
            console.log("Signed in sucessfully", data)
            reset()
        } catch (error) {
            console.error("Failed to login", data)
        }
    }
    return (
<div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden py-20">
            {/* GRID BACKGROUND */}
            <div
                className="absolute inset-0
                bg-[linear-gradient(to_right,#e5e7eb_2px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_2px,transparent_1px)]
                bg-[size:48px_48px]
                [mask-image:radial-gradient(circle_at_center,black_25%,transparent_70%)]"
            />
            {/* FORM CARD */}
            <div className="relative z-10 border-8 border-[#BFD5FB] rounded-4xl ">
                <div className="bg-white rounded-2xl shadow-xl p-7 w-120 ">
                    <LoginForm
                    onSubmit={onSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit}
                    register={register}/>
                </div>
            </div>
        </div>
    )
}
export default LoginPage