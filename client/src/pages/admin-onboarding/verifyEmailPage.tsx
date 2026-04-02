import VerifyEmailCard from "@/components/admin-onboarding/auth/VerifyEmailCard"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"
import { Button } from "@/components/ui/button"
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
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
          
            {/* ACTION BUTTONS */}
      <div className="flex gap-4 items-end justify-end w-full px-10 pb-4">
        <Button
          variant="outline"
          className="px-6 border-blue-600 text-blue-600 cursor-pointer"
        >
          Back
        </Button>

        <Button className="px-6 bg-blue-600 hover:bg-blue-700 cursor-pointer">
          Login
        </Button>
      </div>
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