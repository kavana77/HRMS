import { useAttendance } from "@/hooks/useAttendance"


const PunchCard = () => {
    const {statusQuery, punchInMutation, punchOutMutation} =useAttendance()
  const data = statusQuery.data;

    const status = statusQuery.data?.status

    return (
        <div className="bg-white w-60 p-4 rounded-lg shadow-md">
            {/* Header */}
            <div>
                <p>Today • {new Date().toDateString()}</p>
            </div>
            {/* Status */}
<div className="mb-4">
        {status === "NOT_PUNCHED" && (
          <span className="text-gray-600 font-medium">
            Status: Not Punched In
          </span>
        )}

        {status === "PUNCHED_IN" && (
          <span className="text-blue-600 font-medium">
            Status: Punched In
          </span>
        )}

        {status === "PUNCHED_OUT" && (
                      <span className="text-green-600 font-medium">
            Status: Attendance Completed
          </span>
        )}
      </div>
            {/* Times */}
  <div className="space-y-2 mb-6 text-sm text-gray-700">
        {data?.punchInTime && (
          <p>
            ⏰ Punch In:{" "}
            {new Date(data.punchInTime).toLocaleTimeString()}
          </p>
        )}

        {data?.punchOutTime && (
          <p>
            ⏰ Punch Out:{" "}
            {new Date(data.punchOutTime).toLocaleTimeString()}
          </p>
        )}
        
        {data?.totalMinutes && (
          <p>
            🕒 Working Time:{" "}
            {(data.totalMinutes / 60).toFixed(2)} hrs
          </p>
        )}
      </div>
    {/* Action Button */}
            {status === "NOT_PUNCHED" && (
            <button
                onClick={() => punchInMutation.mutate()}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
                Punch In
            </button>
            )}
            {status === "PUNCHED_IN" && (
                <button
                onClick={()=> punchOutMutation.mutate()}>
                    Punch Out
                </button>
            )}
            {status === "PUNCHED_OUT" &&(
                <p>
                    completed
                </p>
            )}
        </div>
    )
}
export default PunchCard