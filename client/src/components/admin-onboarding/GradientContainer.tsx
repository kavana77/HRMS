interface GradientContainerProps {
  children: React.ReactNode
}

const GradientContainer = ({ children }: GradientContainerProps) => {
  return (
    <div className=" flex items-center justify-center ">
      
      {/* Outer Container */}
      <div className="relative w-[460px] rounded-[28px] border border-[#BFD5FB] bg-[#EAF1FE] p-4 flex items-center justify-center overflow-hidden shadow-[inset_0_0_40px_rgba(48,119,243,0.18)]">

        {/* Top Left Gradient Blob */}
        <div className="absolute -top-[70px] -left-[70px] w-[210px] h-[210px] rounded-full blur-[64px] opacity-70 pointer-events-none bg-[radial-gradient(circle,_#B96AF7_0%,_#3077F3_60%,_transparent_100%)]" />

        {/* Bottom Right Gradient Blob */}
        <div className="absolute -bottom-[70px] -right-[70px] w-[210px] h-[210px] rounded-full blur-[64px] opacity-70 pointer-events-none bg-[radial-gradient(circle,_#3077F3_0%,_#B96AF7_60%,_transparent_100%)]" />

        {/* White Card */}
        <div className="relative z-10 bg-white rounded-[20px] w-full p-8 shadow-[0_0_48px_rgba(48,119,243,0.5)]">
          {children}
        </div>

      </div>
    </div>
  )
}

export default GradientContainer