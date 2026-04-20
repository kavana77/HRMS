import PayrollCard from "@/components/admin-onboarding/company-setting/PayrollCard"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const PayRollPage = () => {
    return (
        <div>
            <Link to="/admin/workspace-setup" className="text-[10px] text-gray-600 flex items-center gap-1"><ArrowLeft size={12} />Workspace</Link>
            <h1 className="font-bold text-gray-600 mt-2 text-2xl">Payroll</h1>
            <PayrollCard />
        </div>
    )
}
export default PayRollPage