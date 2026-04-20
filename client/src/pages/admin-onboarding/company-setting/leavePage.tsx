import AddHoliday from "@/components/admin-onboarding/company-setting/AddHoliday"
import EmptyState from "@/components/admin-onboarding/company-setting/EmptyState"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHoliday } from "@/hooks/useHoliday"
import { ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import HolidayList from "@/components/admin-onboarding/company-setting/HolidayList"
import { useLeave } from "@/hooks/useLeave"
import LeaveTable from "@/components/admin-onboarding/company-setting/LeaveTable"
import { type LeaveResponseType } from "@/lib/zodSchema"
import { completeStep } from "@/utils/http"


const LeavePage = () => {
    const navigate = useNavigate()
    const { leaves, deleteLeave, updateLeaveStatus } = useLeave()
    const [selectedHoliday, setSelectedHoliday] = useState<any>(null)
    const { addHoliday, holidays, deleteHoliday, updateHoliday } = useHoliday()
    const { register, handleSubmit, reset } = useForm<{ holidayName: string, holidayDate: string }>()
    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState("company")

    const handleStatusChange = async (id: string, status: "Active" | "Inactive") => {
        try {
            await updateLeaveStatus({ id, status })
        } catch (error) {
            console.error("Failed to update status", error)
        }
    }
    const handleDeleteLeave = async (id: string) => {
        try {
            await deleteLeave(id)
        } catch (error) {
            console.error("Failed to delete leave", error)
        }
    }
    const handleEditLeave = (leave: LeaveResponseType) => {
        navigate('/leave/add-leave', {
            state: leave
        })
    }
    console.log("holidays:", holidays)
    const handleDeleteHoliday = async (id: string) => {
        try {
            await deleteHoliday(id)
        } catch (error) {
            console.error("Failed to delete holiday", error)
        }
    }
    const handleaddHoliday = async (data: { holidayName: string, holidayDate: string }) => {
        try {
            if (selectedHoliday) {
                await updateHoliday({
                    id: selectedHoliday._id,
                    data
                })
            } else {
                await addHoliday(data)
                await completeStep("holiday")
            }
            reset()
            setSelectedHoliday(null)
            setIsOpen(false)
        } catch (error) {
            console.error("Failed to add holiday", error)
        }
    }
    return (
        <div className="space-y-2">
            <Link to="/admin/workspace-setup" className="text-[10px] text-gray-600 flex items-center gap-1"><ArrowLeft size={12} />Workspace</Link>
            <h1 className="font-bold text-gray-600 text-2xl ">Leave</h1>
            <Tabs defaultValue="company" onValueChange={setTab}>
                <TabsList className="bg-gray-200 py-5">
                    <TabsTrigger value="company" className="py-4">Company leave policy</TabsTrigger>
                    <TabsTrigger value="holiday" className="py-4">Holiday leave</TabsTrigger>
                </TabsList>
            </Tabs>
            {tab === "company" &&
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-medium">Company leave policy</h2>
                        <Link to="add-leave">
                            <Button className="cursor-pointer p-1">+ Add Leave</Button>
                        </Link>
                    </div>
                    {/* Empty State */}
                    {Array.isArray(leaves) && leaves.length === 0 ? (<EmptyState />) : (<LeaveTable
                        leaves={leaves}
                        onDelete={handleDeleteLeave}
                        onEdit={handleEditLeave}
                        onStatusChange={handleStatusChange}
                    />)}
                </div>
            }
            {tab === "holiday" &&
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-medium">Holiday Leave</h2>

                        <Button className="cursor-pointer p-1"
                            onClick={() => setIsOpen(true)}>+ Add Holiday</Button>

                    </div>
                    {/* Empty State */}
                    {Array.isArray(holidays) && holidays.length === 0 ? (<EmptyState />) : (<HolidayList

                        holidays={holidays || []}
                        onDelete={handleDeleteHoliday}
                        onEdit={(holiday) => {
                            setSelectedHoliday(holiday)
                            setIsOpen(true)
                        }} />)}
                </div>
            }

            <AddHoliday
                isOpen={isOpen}
                onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) setSelectedHoliday(null)
                }}
                onSubmit={handleaddHoliday}
                handleSubmit={handleSubmit}
                register={register}
                initialData={selectedHoliday}
                reset={reset}
            />
        </div>
    )
}
export default LeavePage