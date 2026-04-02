import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import LeaveTable from "./LeaveTable"
import { Link } from "react-router"

const AddLeaveForm = () => {
  return (
    <div>
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">
        Add Leave
      </h1>

      <form className="bg-white rounded-xl p-6 space-y-6 shadow-sm border">
        <h1 className="font-semibold text-gray-700 mb-4">
        Leave Details
        </h1>
        {/* GRID - 3 columns */}
        <div className="grid grid-cols-3 gap-6 text-[#6D6F7A]">

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Name <span className="text-red-400">*</span>
            </Label>
            <Input placeholder="e.g Casual leave" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Type <span className="text-red-400">*</span>
            </Label>
            <Input placeholder="e.g Paid" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Validity (From) <span className="text-red-400">*</span>
            </Label>
            <Input type="date" placeholder="DD/MM/YYYY" />
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-3 gap-6 text-[#6D6F7A]">

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Validity (Expiry) <span className="text-red-400">*</span>
            </Label>
            <Input type="date" placeholder="DD/MM/YYYY" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Credited (Number of Days) <span className="text-red-400">*</span>
            </Label>
            <Input placeholder="e.g 5" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Reset <span className="text-red-400">*</span>
            </Label>
            <Input placeholder="Select an option" />
          </div>
        </div>

        {/* DATE */}
        <div className="space-y-1 text-[#6D6F7A]">
          <Label className="text-xs">
            Date <span className="text-red-400">*</span>
          </Label>
          <Input type="date" placeholder="DD/MM" className="max-w-xs" />
          <p className="text-xs text-[#82838D]">
            Example: Reset yearly on 31 December
          </p>
        </div>

        {/* SWITCHES */}
        <div className="space-y-4">

          <div className="flex items-center justify-between bg-gray-100 border border-[#EAEAEC] p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <Switch className="data-unchecked:bg-[#BFD5FB]" />
              <p className="text-sm text-gray-600">
                Carry forward unused leave
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-100 border border-[#EAEAEC] p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <Switch className="data-unchecked:bg-[#BFD5FB]" />
              <p className="text-sm text-gray-600">
                Encash unused leave
              </p>
            </div>
          </div>

        </div>
      </form>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 justify-end mt-6">
        <Link to="/leave">
        <Button
        
          variant="outline"
          className="px-8 border-blue-600 text-blue-600"
        >
          Cancel
        </Button>
        </Link>
        <Button className="px-8 bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
        
      </div>
      <LeaveTable/>
    </div>
  )
}

export default AddLeaveForm