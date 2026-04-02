import LoginConfirmationCard from "@/components/admin-onboarding/auth/LoginConfirmationCard"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"

const LoginConfirmationPage = () => {
    const handleStartSetup = () => {

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
                    companyName="Magure Texh India Pvt. Ltd."
                    onStartSetup={handleStartSetup} />

            </GradientContainer>
        </div>
    )
}
export default LoginConfirmationPage