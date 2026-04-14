import CompanyForm from "@/components/admin-onboarding/CompanyProfileForm"
import GradientContainer from "@/components/admin-onboarding/GradientContainer"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const CompanyProfile = () => {
    return (
        <div className="min-h-screen justify-center bg-white overflow-hidden">
            <div className="flex items-end justify-end m-8 ">
                <Button className="bg-white border border-blue-600 text-blue-600 px-3"> <Link to="/admin/workspace-setup">Back</Link></Button>
            </div>

            <GradientContainer>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Set Up Your Company Profile</h1>
                    <p className="text-sm text-gray-400">Add your official company details to personalize your workspace and ensure accurate records across the system.</p>
                </div>
                <CompanyForm />
            </GradientContainer>
        </div>
    )
}
export default CompanyProfile