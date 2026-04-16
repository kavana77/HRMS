import LoginConfirmationCard from "@/components/admin-onboarding/auth/LoginConfirmationCard"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"
import { firstLoginComplete } from "@/utils/http"
import {  useNavigate } from "react-router-dom"

const LoginConfirmationPage = () => {
     const companyName = localStorage.getItem("companyName") || ""
    const navigate = useNavigate()
    const handleStartSetup = async() => {
        await firstLoginComplete()
        navigate("/admin/workspace-setup")
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
                <LoginConfirmationCard
                    companyName={companyName}
                    onStartSetup={handleStartSetup} />

            </GradientContainer>
        </div>
    )
}
export default LoginConfirmationPage