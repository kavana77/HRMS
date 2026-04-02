import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const PayrollCard = () => {
    return (
        <div className="bg-white rounded-lg mt-6 mx-4 p-4 space-y-4 ">
            <h6 className="font-medium">Payroll Report</h6>
            <div className="space-y-3">
                <div className="space-y-1">
                    <Label className="text-gray-400 text-[12px]">Payroll Report Generation Day <span className="text-red-500">*</span></Label>
                    <Select>
                        <SelectTrigger className="w-[357px] px-2 py-5">
                            <SelectValue className="text-gray-300" placeholder="Select day of month" />
                            </SelectTrigger>
                            <SelectContent className="mt-24">
                            {months.map((month)=>(
                                <SelectItem key={month} value={month.toString()}>{month}</SelectItem>
                            ))}
                            </SelectContent>
                        
                    </Select>
                </div>
                <p className="text-sm text-gray-800">Payroll reports will include attendance data up to the selected date each month</p>
                <button className="bg-blue-50 border border-blue-200 py-3 px-3 rounded-lg">
                    <p className="text-gray-600 text-sm">If a selected date (e.g., 31) does not exist in a shorter month, the report will be generated on the last available day.</p>
                </button>
                <div className="flex items-center gap-4 p-2 my-4 bg-[#F5F5F5] border border-[#EAEAEC] rounded-md">
                    <Switch className="data-checked:bg-blue-500
                    data-unchecked:bg-gray-300"/>
                    <div className="text-sm ">
                        <p className="font-medium">Automatically convert absences to leave</p>
                        <p className="text-gray-600">Approved absences will be adjusted against available leave balance before payroll processing</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PayrollCard