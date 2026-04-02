import type { ReactNode } from "react"

interface SetupStepCardProps {
  icon: ReactNode
  title: string
  description: string
  onClick?: () => void
}

const SetupStepCard = ({
  icon,
  title,
  description,
  onClick,
}: SetupStepCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-[364px] h-[430px] p-6 rounded-xl border bg-white shadow-sm hover:border hover:border-l-[#41E6F8] hover:border-t-[#3077F3] hover:border-b-[#B96AF7] hover:border-r-[#FDA052] hover hover:shadow-md hover:bg-linear-to-b hover:from-blue-200 transition cursor-pointer bg-linear-to-b from-blue-100 to-[#FEFEFE] flex flex-col items-center "
    >
        {/* icon */}
{/* icon wrapper */}
<div className="flex items-center justify-center w-full py-16">

  {/* outer circle */}
  <div className="w-32 h-32 rounded-full bg-gray-100/40 flex items-center justify-center">

    {/* inner circle */}
    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">

      {icon}

    </div>
  </div>

</div>
        <div className="space-y-2">
            {/* title */}
        <h3 className="text-2xl font-semibold">
          {title}
        </h3>

        {/* description */}
        <p className="text-md text-gray-500">
          {description}
        </p>
        </div>
      </div>
  )
}

export default SetupStepCard