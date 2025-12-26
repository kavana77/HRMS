import { Calendar } from "lucide-react"
import { useState } from "react"

const WelcomeAttendanceCard = ()=>{
    const [isPunchedIn, setIsPunchedIn] = useState(false)
    const [lastPunch, setLastPunch] = useState<string | null>(null)

    const handlePunchIn = ()=>{
        setIsPunchedIn(true)
        setLastPunch(new Date().toLocaleString())
    }
    const handlePunchOut = () => {
        setIsPunchedIn(false)
        setLastPunch(new Date().toLocaleString())
    }
    return(
        <div className="w-full flex justify-between h-30 px-4 py-2 text-white bg-linear-to-r from-blue-600 to-cyan-400 rounded-b-xl ">
            <div className="flex-row justify-between items-start">
                {/* Left Content */}
                <h1 className="text-2xl font-semibold">Hello, Kavana!</h1>
                <p className="text-sm opacity-90 mt-1">Hope you are having a great day</p>
                <div className="mt-4">
                    <p className="text-sm mb-1">Profile - 73% Completed</p>
                    <div className="w-48 h-1 bg-white/30 rounded">
                        <div className="w-[73%] h-full bg-white rounded" />
                    </div>
                </div>
            </div>
            {/* Right content */}
            <div className="text-right">
                <div className="flex items-center gap-2 justify-end text-sm mb-4">
                    <Calendar size={16} />
                    Tuesday, Apr 23
                </div>
                <div className="flex gap-3">
                <button
                    onClick={handlePunchIn}
                    disabled={isPunchedIn}
                    className={`px-5 py-2 rounded-lg font-medium transition
                    ${
                        isPunchedIn
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                Punch In
                </button>
                <button
                onClick={handlePunchOut}
                disabled={isPunchedIn}
                className={`px-5 py-2 rounded-lg font-medium transition
                ${
                    !isPunchedIn
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}>
                    Punch Out
                </button>
              
                </div>
                  {lastPunch && (
            <p className="text-xs mt-3 opacity-90">
              Last punch: {lastPunch}
            </p>
          )}
            </div>
        </div>
    )
}
export default WelcomeAttendanceCard