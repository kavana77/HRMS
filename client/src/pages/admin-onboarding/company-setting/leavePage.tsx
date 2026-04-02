import EmptyState from "@/components/admin-onboarding/company-setting/EmptyState"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"


const LeavePage = () => {
    const leaves: any[] = []
    return (
        <div className="space-y-2">
                        <Link to="/admin/workspace-setup" className="text-[10px] text-gray-600 flex items-center gap-1"><ArrowLeft size={12}/>Workspace</Link>
            <h1 className="font-bold text-gray-600 text-2xl ">Leave</h1>
            <Tabs>
                <TabsList className="bg-gray-200 py-5">
                    <TabsTrigger value="compant leave policy" className="py-4">Company leave policy</TabsTrigger>
                    <TabsTrigger value="holiday leave" className="py-4">Holiday leave</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Company leave policy</h2>
                    <Link to="add-leave">
                        <Button className="cursor-pointer p-1">+ Add Leave</Button>
                    </Link>
                </div>
                {/* Empty State */}
                {leaves.length === 0 && <EmptyState />}
            </div>
        </div>
    )
}
export default LeavePage