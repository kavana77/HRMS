import VerifyEmailCard from "@/components/admin-onboarding/auth/VerifyEmailCard"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"
import { useSearchParams } from "react-router-dom"


const VerifyEmailPage = () => {
      const [searchParams] = useSearchParams()

  const email = searchParams.get("email") || ""
    const handleResend = async () =>{
        try {
            console.log("Resend email to: ", email)
        } catch (error) {
            console.error("Failed to resend email", error)
        }
    }
    return(
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
                    <VerifyEmailCard
                    email={email}
                    onResend={handleResend}/>
            </GradientContainer>
        </div>
    )
}
export default VerifyEmailPage