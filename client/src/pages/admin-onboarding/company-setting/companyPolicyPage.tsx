import EmptyState from "@/components/admin-onboarding/company-setting/EmptyState"
import FileUploads from "@/components/admin-onboarding/FileUpload"
import SelectDialog from "@/components/admin-onboarding/SelectDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
const departments = ["HR", "Security", "Compliance", "IT", "Finance"]

const CompanyPolicyPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const policies: any[] = []

    return (
        <div>
            <Link to="/admin/workspace-setup" className="text-[10px] text-gray-600 flex items-center gap-1"><ArrowLeft size={12}/>Workspace</Link>
            <h1 className="font-semibold text-2xl text-gray-700 my-4">Company Policy</h1>

            {/* Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                    <h2 className=" font-medium">Policy List of 2026</h2>
                    <Button onClick={() => setIsOpen(true)} className="cursor-pointer">+ Add Policy</Button>
                </div>
                {/* Empty State */}
                {policies.length === 0 && <EmptyState />}
            </div>
            <SelectDialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                title="Add Policy">
                <div className="space-y-2">
                    <div className="space-y-1">
                        <Label className="text-gray-400 text-[12px]">Policy Name <span className="text-red-400">*</span></Label>
                        <Input className="text-gray-300 py-5 " placeholder="e.g. Expense Reimbursement Policy" />
                    </div>
                    <div>
                        <Label className="text-gray-400 text-[12px]">Category <span className="text-red-400">*</span></Label>
                        <Select>
                            <SelectTrigger className="w-full h-16 py-5 rounded-md">
                                <SelectValue placeholder="Select an option"/>
                            </SelectTrigger>
                            <SelectContent>
                            {departments.map((department)=>(
                                <SelectItem key={department}>
                                    {department}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-gray-400 text-[12px]">Effective From <span className="text-red-400">*</span></Label>
                        <Input className="text-gray-300 py-5 " type="date" />
                    </div>
                    {/* File Upload */}
                    <FileUploads
                    uploadTypes="document"/>
                </div>
                <div>
                    
                </div>
            </SelectDialog>
        </div>
    )
}
export default CompanyPolicyPage