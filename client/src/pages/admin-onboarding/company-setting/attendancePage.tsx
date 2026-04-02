import AttendanceSettingForm from "@/components/admin-onboarding/company-setting/AttendanceSettingForm"
import ShiftRow from "@/components/admin-onboarding/company-setting/ShiftRow"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const AttendancePage = ()=>{
    return (
        <div>
            <Link to="/admin/workspace-setup" className="text-[10px] text-gray-600 flex items-center gap-1"><ArrowLeft size={12}/>Workspace</Link>
            <h1 className="font-semibold text-gray-600 text-2xl mt-2 mb-4">Attendance</h1>
            <AttendanceSettingForm/>
            <ShiftRow/>
        </div>
    )
}
export default AttendancePage