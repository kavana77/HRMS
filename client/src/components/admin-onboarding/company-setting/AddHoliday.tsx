import { Label } from "@/components/ui/label"
import SelectDialog from "../SelectDialog"
import { Input } from "@/components/ui/input"
import type { UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
type AddHolidayProps = {
  isOpen: boolean,
  onOpenChange: (open: boolean) => void,
  onSubmit: (data: { holidayName: string, holidayDate: string }) => void,
  handleSubmit: UseFormHandleSubmit<{ holidayName: string, holidayDate: string }>
  register: UseFormRegister<{ holidayName: string, holidayDate: string }>
  initialData?: { holidayName: string, holidayDate: string }
  reset: UseFormReset<{ holidayName: string; holidayDate: string }>
}
const AddHoliday = ({ isOpen, onOpenChange, handleSubmit, onSubmit, register, initialData, reset }: AddHolidayProps) => {
  useEffect(() => {
    if (initialData) {
      reset({
        holidayName: initialData.holidayName,
        holidayDate: initialData.holidayDate.split("T")[0]
      })
    }
  }, [initialData, reset])
  return (

    <SelectDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Add Holiday">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label className="text-xs text-[#6D6F7A]">Holiday Name <span className="text-red-400">*</span></Label>
        <Input placeholder="e.g. Independence Day" {...register("holidayName")} />
        <Label className="text-xs text-[#6D6F7A] mt-4">Holiday Date <span className="text-red-400">*</span></Label>
        <Input type="date" className="text-gray-300" {...register("holidayDate")} />

        <div className="flex gap-6 justify-center mt-6">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-white px-14 border border-blue-600 text-blue-600"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-14 border border-blue-500 bg-blue-600 text-white"
          >
            Send
          </Button>
        </div>
      </form>
    </SelectDialog>

  )
}
export default AddHoliday