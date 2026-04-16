import { Button } from "@/components/ui/button"
import Logo from "../../../assets/magure-logo.png"

interface LoginConfirmationCardProps {
  companyName: string
  onStartSetup: () => void
}

const LoginConfirmationCard = ({
  companyName,
  onStartSetup,
}: LoginConfirmationCardProps) => {
  return (
    <div className="text-center space-y-6">
      
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src={Logo}
          alt="logo"
          className="w-14"
        />
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">
          Admin access confirmed
        </h2>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        You're logged in as an Admin for{" "}
        <br/>
        <span className="font-medium text-black">
          {companyName}
        </span>.
        <br />
        You'll be able to manage employees, policies, and payroll.
      </p>

      {/* Button */}
      <Button
        className="w-full cursor-pointer"
        onClick={onStartSetup}
      >
        Start setup
      </Button>
    </div>
  )
}

export default LoginConfirmationCard