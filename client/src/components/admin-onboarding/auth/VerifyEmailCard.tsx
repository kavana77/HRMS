import { Share } from "lucide-react"
import Logo from "../../../assets/magure-logo.png"
import Microsoft from "../../../assets/microsoft-outlook.png"

interface VerifyEmailCardProps {
    email: string
    onResend?: () => void
}

const VerifyEmailCard = ({email, onResend}: VerifyEmailCardProps)=>{
    const openOutlook = () => {
    window.open("https://outlook.live.com/mail", "_blank")
  }
    return(
        <div className="flex flex-col justify-center items-center text-center space-y-2">
            <img src={Logo} className="w-16 mb-6" />
            <h1 className="font-bold text-2xl">Verification Email Sent!</h1>
            <h1 className="font-bold text-2xl">Check your inbox</h1>
            {/* Description */}
      <p className="text-sm text-gray-600">
        We've sent a verification link to{" "}
        <span className="text-blue-600 font-medium">{email}</span>.  
        Please verify to enjoy the service of HR system.
      </p>            {/* Open Outlook Button */}
            <button onClick={openOutlook} className="my-4 gap-2  flex items-center justify-center border-2 border-black py-2 w-50 rounded-4xl shadow-lg">
                <img src={Microsoft} className="w-8"/>
                <p>Open Outlook</p>
                <Share/>
            </button>
            {/* Resent */}
            <p className="mt-6 text-sm text-gray-400">Didn't receive the email?{" "}
                <button
                onClick={onResend}
                className="text-blue-600 font-medium hover:underline"
                >Resent</button>
            </p>
        </div>
    )
}
export default VerifyEmailCard