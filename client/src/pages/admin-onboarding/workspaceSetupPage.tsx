import FileIcon from "../../assets/icons/workspace-setup/file.png"
import GFileIcon from "@/assets/icons/workspace-setup/fileG.png"
import SettingIcon from "../../assets/icons/workspace-setup/setting.png"
// import GSettingIcon from "@/assets/icons/workspace-setup/settingG.png"
import MailIcon from "../../assets/icons/workspace-setup/mail.png"
// import GMailIcon from "@/assets/icons/workspace-setup/mailG.png"
import SetupStepCard from "../../components/admin-onboarding/SetupStepCard"
import { getProgress } from "@/utils/http"
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/magure-logo.png"
import InviteAdmin from "@/components/admin-onboarding/SelectDialog"
import { useEffect, useState } from "react"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "@/components/ui/button"
import { getCompanyProfile } from "@/utils/http"

const WorkspaceSetupPage = () => {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [companyExists, setCompanyExists] = useState(false)
  const [openInviteAdmin, setOpenInviteAdmin] = useState(false)
useEffect(() => {
  const fetchData = async () => {
    try {
      const [companyRes, progressRes] = await Promise.all([
        getCompanyProfile(),
        getProgress()
      ])

      setCompanyExists(companyRes.exists)
      setProgress(progressRes.progress || 0)
      setCompletedSteps(progressRes.completedSteps || [])

    } catch (error) {
      console.error("Error fetching data", error)
    }
  }

  fetchData()
}, [])
  return (
    <div className="p-14 flex flex-col items-center justify-center bg-gray-50 ">

      {/* Logo */}
      <img src={Logo} className="w-12 mb-4" />

      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">
        Set up your workspace
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-center mb-10">
        Complete the essential steps to configure your company and start managing your team.
      </p>

      {/* Cards */}
      <div className="flex gap-6 flex-wrap justify-center">

        <SetupStepCard
          icon={<img src={companyExists?GFileIcon:FileIcon} className="w-8 h-8"/>}
          title="Company Profile"
          description="Add your company details like name, logo, and registered address."
          onClick={!companyExists ? () => navigate("/admin/setup-company") : undefined}
          isCompleted={companyExists}
        />

        <SetupStepCard
          icon={<img src={SettingIcon} className="w-8 h-8"/>}
          title="Company Settings"
          description="Configure attendance rules, leave policies, and payroll preferences."
          onClick={() => navigate("/dashboard")}
          isCompleted={completedSteps.length > 0}
          progress={progress}
        />

        <SetupStepCard
          icon={<img src={MailIcon} className="w-8 h-8"/>}
          title="Invite Admin"
          description="Invite your HR team members to help manage operations."
          onClick={() => setOpenInviteAdmin(true)}
        />

      </div>

      {/* Dashboard Link */}
      <button
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer mt-10 text-blue-600 text-sm hover:underline"
      >
        Go to Dashboard →
      </button>

    <InviteAdmin title="Invite Admin"
    isOpen={openInviteAdmin}
    onOpenChange={setOpenInviteAdmin}>
                  <div className="text-gray-500 space-y-2">
              <Label className="mt-6">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. Abhinav Chowdary" className="py-5" />

              <Label className="mt-5">
                Company's Email ID <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. abhinav@company.com" className="py-5" />
            </div>
 {/* ACTION BUTTONS */}
      <div className="flex gap-4 items-center justify-center mt-6">
        
        <Button
          variant="outline"
          className="px-12 border-blue-600 text-blue-600"
          onClick={()=>setOpenInviteAdmin(false)}
        >
          Cancel
        </Button>
        
        <Button type="submit" className="px-12 bg-blue-600  hover:bg-blue-700">
          Save
        </Button>
        </div>

    </InviteAdmin>
   
    </div>
  )
}

export default WorkspaceSetupPage