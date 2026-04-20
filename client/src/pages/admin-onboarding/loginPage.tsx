import LoginForm from "@/components/admin-onboarding/auth/LoginForm"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"
import { useAuth } from "@/hooks/useAuth"
import { adminLoginSchema, type AdminLoginType } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const { login } = useAuth()
    const [apiError, setApiError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminLoginType>({
        resolver: zodResolver(adminLoginSchema)
    })

    const onSubmit = async (data: AdminLoginType) => {
        try {
            setApiError(null)
            const res = await login(data)
            console.log("Logged in sucessfully", data)
            reset()
            if (res.user.isFirstLogin) {
                navigate("/admin/login-confirmation")
            } else {
                navigate("/admin/workspace-setup")
            }
        } catch (error: any) {
            console.error("Failed to login", error)
            setApiError(error.message || "Invalid email or password")
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
                    register={register}
                    apiError={apiError}
                    setApiError={setApiError} />
            </GradientContainer>
        </div>
    )
}
export default LoginPage