import LoginForm from "@/components/admin-onboarding/auth/LoginForm"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"
import { useAuth } from "@/hooks/useAuth"
import { adminLoginSchema, type AdminLoginType } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const LoginPage = () => {
    const {login} = useAuth()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminLoginType>({
        resolver: zodResolver(adminLoginSchema)
    })

    const onSubmit = async (data: AdminLoginType) => {
        try {
            await login(data)
            console.log("Logged in sucessfully", data)
            reset()
        } catch (error) {
            console.error("Failed to login", data)
        }
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
            {/* GRID BACKGROUND */}
            <div
                className="absolute inset-0
                bg-[linear-gradient(to_right,#e5e7eb_2px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_2px,transparent_1px)]
                bg-[size:48px_48px]
                [mask-image:radial-gradient(circle_at_center,black_25%,transparent_70%)]"
            />
            {/* FORM CARD */}
            <GradientContainer>
                <LoginForm
                    onSubmit={onSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit}
                    register={register} />
            </GradientContainer>
        </div>
    )
}
export default LoginPage