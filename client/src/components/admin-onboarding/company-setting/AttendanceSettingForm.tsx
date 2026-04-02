import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const AttendanceSettingForm = () => {
    return (
        <div className="bg-white p-4 rounded-xl space-y-4">
            <h2 className="font-medium">Attendance Details</h2>
            <form>
                <div className="text-[#6D6F7A] grid grid-cols-3 justify-between">
                    <div>
                        <Label className="text-[12px] mb-1">Attendance Tracking Method <span className="text-red-400">*</span></Label>
                        <Select>
                            <SelectTrigger className="w-70 py-4">
                                <SelectValue placeholder="Select an option"/>
                            </SelectTrigger>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-[12px] mb-1">Weekly Off <span className="text-red-400">*</span></Label>
                        <Select>
                            <SelectTrigger className="w-70 py-4">
                                <SelectValue placeholder="Select an option"/>
                            </SelectTrigger>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-[12px] mb-1">Late Mark After (Minutes) <span className="text-red-400">*</span></Label>
                        <Select>
                            <SelectTrigger className="w-70 py-4">
                                <SelectValue placeholder="e.g. 15"/>
                            </SelectTrigger>
                        </Select>
                    </div>
                </div>
            </form>
             <div className="space-y-4">

          <div className="flex items-center justify-between bg-gray-100 border border-[#EAEAEC] px-4 py-3 rounded-xl">
            <div className="flex items-center gap-4">
              <Switch className="data-unchecked:bg-[#BFD5FB]" />
              <p className="text-sm text-gray-600">
                Allow attendance regularization requests
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-100 border border-[#EAEAEC] px-4 py-3 rounded-xl">
            <div className="flex items-center gap-4">
              <Switch className="data-unchecked:bg-[#BFD5FB]" />
              <p className="text-sm text-gray-600">
                Require approval for late attendance
              </p>
            </div>
          </div>

        </div>
            
        </div>
    )
}
export default AttendanceSettingForm