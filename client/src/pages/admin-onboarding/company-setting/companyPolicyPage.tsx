import EmptyState from "@/components/admin-onboarding/company-setting/EmptyState"
import PolicyList from "@/components/admin-onboarding/company-setting/PolicyList"
import FileUploads from "@/components/admin-onboarding/FileUpload"
import SelectDialog from "@/components/admin-onboarding/SelectDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePolicy } from "@/hooks/usePolicy"
import type { PolicyType } from "@/lib/zodSchema"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
const departments = ["HR", "Security", "Compliance", "IT", "Finance"]

const CompanyPolicyPage = () => {
    const [file, setFile] = useState<File | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const {handleSubmit, register, setValue,reset} = useForm<PolicyType>()
    const {createPolicy, Policy,deletePolicy}=usePolicy()
    
    const onSubmit = async(formData: PolicyType) =>{
        try {
            await createPolicy({data: formData, file: file || undefined})
            reset()
            setFile(null)
            setIsOpen(false)
        } catch (error) {
            console.error("Failed to Submit Policy")
            throw error
        }
    }
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
                {Array.isArray(Policy) && Policy.length === 0 ?<EmptyState />:<PolicyList
                policies={Policy}
                onDelete={deletePolicy}/>}
            </div>
            <SelectDialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                title="Add Policy">
                <div className="space-y-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1">
                        <Label className="text-gray-400 text-[12px]">Policy Name <span className="text-red-400">*</span></Label>
                        <Input
                        {...register("policyName")}
                         className="text-gray-300 py-5 " placeholder="e.g. Expense Reimbursement Policy" />
                    </div>
                    <div>
                        <Label className="text-gray-400 text-[12px]">Category <span className="text-red-400">*</span></Label>
                        <Select onValueChange={(value) => setValue("category", value as "HR" | "Finance" | "IT" | "Security" | "Compliance")}>
                            <SelectTrigger className="w-full h-16 py-5 rounded-md">
                                <SelectValue placeholder="Select an option"/>
                            </SelectTrigger>
                            <SelectContent>
                            {departments.map((department)=>(
                                <SelectItem key={department} value={department}>
                                    {department}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-gray-400 text-[12px]">Effective From <span className="text-red-400">*</span></Label>
                        <Input
                        {...register("effectiveFrom")}
                         className="text-gray-300 py-5 " type="date" />
                    </div>
                    {/* File Upload */}
                    <FileUploads
                    uploadTypes="document"
                    onFileChange={(file: File)=> setFile(file)}/>
                    <div className="flex gap-4 justify-end mt-6">
                            
                            <Button
                              variant="outline"
                              onClick={()=> setIsOpen(false)}
                              className="px-8 border-blue-600 text-blue-600"
                            >
                              Cancel
                            </Button>
                          
                            <Button type="submit" className="px-8 cursor-pointer bg-blue-600 hover:bg-blue-700">
                              Save
                            </Button>
                            
                          </div>
                    </form>
                </div>
                
                <div>
                    
                </div>
            </SelectDialog>
        </div>
    )
}
export default CompanyPolicyPage