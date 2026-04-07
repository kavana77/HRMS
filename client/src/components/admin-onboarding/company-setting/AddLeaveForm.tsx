import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { DatePicker } from "@/components/DatePicker"
import type { LeaveTypeType } from "@/lib/zodSchema"
import { useLeave } from "@/hooks/useLeave"


const AddLeaveForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const editData = location.state
  const {addLeave, updateLeave} = useLeave()
  const formattedData = editData
  ? {
      ...editData,
      validityFrom: editData.validityFrom?.split("T")[0],
      validityTo: editData.validityTo?.split("T")[0],
    }
  : undefined
  const {register, handleSubmit, control, reset} = useForm<LeaveTypeType>({
    defaultValues: formattedData
  })

  const onSubmit = async(data: LeaveTypeType)=> {
    try {
      if(editData){
        await updateLeave({
          id: editData._id,
          data
        })
      }else{
        await addLeave(data)
      }
      reset()
      navigate('/leave')
    } catch (error) {
      console.error("Failed to add leave", error)
    }
  }
  return (
    <div>
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">
        Add Leave
      </h1>

      <form className="bg-white rounded-xl p-6 space-y-6 shadow-sm border" 
      onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-semibold text-gray-700 mb-4">
        Leave Details
        </h1>
        {/* GRID - 3 columns */}
        <div className="grid grid-cols-3 gap-6 text-[#6D6F7A]">

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Name <span className="text-red-400">*</span>
            </Label>
            <Input
            {...register("leaveName")}
             placeholder="e.g Casual leave" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Type <span className="text-red-400">*</span>
            </Label>
            <Input
            
            {...register("leaveType")}
            placeholder="e.g Paid" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Validity (From) <span className="text-red-400">*</span>
            </Label>
            <Input
            {...register("validityFrom")}
             type="date" placeholder="DD/MM/YYYY" />
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-3 gap-6 text-[#6D6F7A]">

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Validity (Expiry) <span className="text-red-400">*</span>
            </Label>
            <Input
            {...register("validityTo")}
             type="date" placeholder="DD/MM/YYYY" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Credited (Number of Days) <span className="text-red-400">*</span>
            </Label>
            <Input
            type="number"
            {...register("creditedDays", {valueAsNumber:  true})}
             placeholder="e.g 5" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Leave Reset <span className="text-red-400">*</span>
            </Label>
            <select
  {...register("resetType")}
  className="w-full border h-8 rounded-md px-2"
>
  <option value="">Select</option>
  <option value="yearly">Yearly</option>
  <option value="monthly">Monthly</option>
</select>
          </div>
        </div>

        {/* DATE */}
        <div className="space-y-1 text-[#6D6F7A]">
          <Label className="text-xs">
            Date <span className="text-red-400">*</span>
          </Label>
          <Controller
          control={control}
          name="resetDate"
          render={({field})=>(
            <DatePicker 
            value={field.value ? new Date(field.value) : undefined}
            onChange={(date: Date) =>
                  field.onChange(date?.toISOString())
                }
            />
          )}/>
          <p className="text-xs text-[#82838D]">
            Example: Reset yearly on 31 December
          </p>
        </div>

        {/* SWITCHES */}
        <div className="space-y-4">

          <div className="flex items-center justify-between bg-gray-100 border border-[#EAEAEC] p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <Controller
              control={control}
              name="carryForward"
              render={({field})=>(
                <Switch className="data-unchecked:bg-[#BFD5FB]" 
                checked={field.value}
                onCheckedChange={field.onChange}
                />
              )}
              />
              
              <p className="text-sm text-gray-600">
                Carry forward unused leave
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-100 border border-[#EAEAEC] p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <Controller
              control={control}
              name="encashUnused"
              render={({field})=>(
                <Switch className="data-unchecked:bg-[#BFD5FB]" 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}/>
              
              <p className="text-sm text-gray-600">
                Encash unused leave
              </p>
            </div>
          </div>

        </div>
           {/* ACTION BUTTONS */}
      <div className="flex gap-4 justify-end mt-6">
        <Link to="/leave">
        <Button
          variant="outline"
          className="px-8 border-blue-600 text-blue-600"
        >
          Cancel
        </Button>
        </Link>
        <Button type="submit" className="px-8 bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
        
      </div>
      </form>
    </div>
  )
}

export default AddLeaveForm