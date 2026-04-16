import type { ReactNode } from "react"

interface SetupStepCardProps {
  icon: ReactNode
  title: string
  description: string
  onClick?: () => void
  isCompleted?: boolean
}

const SetupStepCard = ({
  icon,
  title,
  description,
  onClick,
  isCompleted
}: SetupStepCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-[364px] h-[420px] p-6 rounded-2xl shadow-sm flex flex-col transition
        ${
          isCompleted
            ? "bg-gradient-to-b from-green-100 to-white cursor-not-allowed"
            : "border bg-white bg-linear-to-b from-blue-100 to-[#FEFEFE] hover:border-l-[#41E6F8] hover:border-t-[#3077F3] hover:border-b-[#B96AF7] hover:border-r-[#FDA052] hover:shadow-md hover:bg-linear-to-b hover:from-blue-200 cursor-pointer"
        }`}
    >
      {/* ICON SECTION */}
      <div className="flex items-center justify-center w-full pt-10 pb-6 relative">

        {/* 🌟 Soft Glow */}
        {isCompleted && (
          <div className="absolute flex items-center justify-center">
            <div
              className="w-[220px] h-[220px] rounded-full"
              style={{
                background:
                  "bg-[radial-gradient(circle,_#95EF6A_0%,_#B9F59D_40%,_transparent_70%)]",
                filter: "blur(10px)"
              }}
            />
          </div>
        )}

        {/* Outer Circle */}
        <div
          className={`w-24 h-24 mt-2 rounded-full flex items-center justify-center z-10
            ${isCompleted ? "bg-[#F3FEE7]" : "bg-gray-100"}
          `}
        >
          {/* Inner Circle */}
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center
              ${isCompleted ? "bg-white" : "bg-gray-200"}
            `}
          >
            {icon}
          </div>
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="space-y-2 mt-20" >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>

          {/* ✅ Completed Badge */}
          {isCompleted && (
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
              Completed
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default SetupStepCard