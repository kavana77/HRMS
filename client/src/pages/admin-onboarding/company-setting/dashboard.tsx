import SetupStepCard from "@/components/admin-onboarding/SetupStepCard"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import FileIcon from "@/assets/icons/workspace-setup/file.png"
import SettingIcon from "@/assets/icons/workspace-setup/setting.png"
import MailIcon from "@/assets/icons/workspace-setup/mail.png"
import { Button } from "@/components/ui/button"


const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Link to="/admin/workspace-setup" className="text-[10px] text-gray-600 flex items-center gap-1"><ArrowLeft size={12} />Workspace</Link>
            <h1 className="font-semibold text-2xl text-gray-600 my-4">Dashboard</h1>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
                <p className="text-sm font-medium">Please complete the set up to access the dashboard features</p>
                <div className="grid grid-cols-3 gap-4">
                    <SetupStepCard
                        variant="horizontal"
                        icon={<img src={FileIcon} className="w-8 h-8" />}
                        title="Company Profile"
                        description="Add your company details like name, logo, and registered address.">
                            <Button onClick={()=>navigate("/admin/setup-company")} className="cursor-pointer sm:text-xs">Set up</Button>
                        </SetupStepCard>
                    <SetupStepCard
                        variant="horizontal"
                        icon={<img src={SettingIcon} className="w-8 h-8" />}
                        title="Company Settings"
                        description="Configure attendance rules, leave policies, and payroll preferences."
                    >
                        <Button>Continue</Button>
                    </SetupStepCard>
                    <SetupStepCard
                        variant="horizontal"
                        icon={<img src={MailIcon} className="w-8 h-8" />}
                        title="Invite Admin"
                        description="Invite your HR team members to help manage operations.">
                            <Button>Set Up</Button>
                        </SetupStepCard>
                </div>
            </div>
        </div>
    )
}
export default Dashboard