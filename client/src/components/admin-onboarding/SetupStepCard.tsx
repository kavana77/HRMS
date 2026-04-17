import type { ReactNode } from "react"


interface SetupStepCardProps {
  icon: ReactNode
  title: string
  description: string
  variant?: "vertical" | "horizontal" 
  onClick?: () => void
  isCompleted?: boolean
  progress?: number
  showProgress?: boolean
  className?: string
  children?: ReactNode
}

const SetupStepCard = ({
  icon,
  title,
  description,
  variant,
  onClick,
  isCompleted,
  progress = 0,
  showProgress,
  className,
  children
}: SetupStepCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl shadow-sm transition
        ${variant === "horizontal"
      ? "flex flex-row items-center rounded-2xl border-8 md:border-12 border-white  w-full h-[266px]"
      : "flex flex-col w-[364px] h-[420px] hover:border-l-[#41E6F8] hover:border-t-[#3077F3] hover:border-b-[#B96AF7] hover:border-r-[#FDA052] hover:shadow-md hover:bg-linear-to-b hover:from-blue-200 p-6"}
        ${isCompleted
          ? "bg-gradient-to-b from-green-100 to-white cursor-not-allowed"
          : "border bg-white bg-linear-to-b from-blue-100 to-[#FEFEFE]  cursor-pointer"
        }${className}`}
    >
      {/* ICON SECTION */}
      <div className={`flex items-center justify-center ${variant === "horizontal" ? "px-2 md:px-6" : "w-full pt-10 pb-6"} relative
      `}>

        {/* Soft Glow */}
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
          className={`  rounded-full flex items-center justify-center z-10
            ${isCompleted ? "bg-[#F3FEE7]" : "bg-gray-100"}
            ${variant === "horizontal"?"w-18 h-18 md:w-24 md:h-24 ":"w-24 h-24 mt-2"}
          `}
        >
          {/* Inner Circle */}
          <div
            className={` rounded-full flex items-center justify-center
              ${isCompleted ? "bg-white" : "bg-gray-200"}
              ${variant === "horizontal"? "w-14 h-14":"w-16 h-16"}
            `}
          >
            {icon}
          </div>
        </div>
      </div>
      {/* Show progress ONLY when > 0 */}
      {showProgress && progress > 0 && (
        <div className="absolute w-[88%] top-54 ">
          <p className="text-xs text-gray-500 mb-1">
            {progress}% complete
          </p>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {/* TEXT SECTION */}
      <div className={`
  ${variant === "horizontal" ? "flex-1 h-full pl-2 items-center justify-center bg-white" : "mt-16 space-y-2"}
`}>
        <div className="flex items-center justify-between">
          <h3 className="md:text-xl font-semibold">{title}</h3>

          {/* Completed Badge */}
          {isCompleted && (
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
              Completed
            </span>
          )}
        </div>

        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
         {children && (
        <div >
          {children}
        </div>
      )}
      </div>
     
    </div>
  )
}

export default SetupStepCard