import SignupForm from "@/components/admin-onboarding/auth/SignupForm"
import { type AdminSignUpType, adminSignupSchema } from "@/lib/zodSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"
import { useAuth } from "@/hooks/useAuth"

const AdminSignUpPage = () => {
    const {signup} = useAuth()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminSignUpType>({
        resolver: zodResolver(adminSignupSchema)
    })

    const onSubmit = async (data: AdminSignUpType) => {
        try {
            await signup(data)
            console.log("Signed in successfully", data)
            reset()
        } catch (error) {
            console.error("Failed to signup", data)
        }
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden ">
            {/* GRID BACKGROUND */}
            <div
                className="absolute inset-0
                bg-[linear-gradient(to_right,#e5e7eb_2px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_2px,transparent_1px)]
                bg-[size:48px_48px]
                [mask-image:radial-gradient(circle_at_center,black_25%,transparent_70%)]"
            />
            {/* FORM CARD */}
            <GradientContainer>
                <SignupForm
                    onSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                    register={register}
                    errors={errors}
                    isSubmitting={isSubmitting} />
            </GradientContainer>
        </div>
    )
}
export default AdminSignUpPage