import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

type Shift = {
  shiftName: string
  startTime: string
  endTime: string
  isDefault: boolean
}

type FormValues = {
  shifts: Shift[]
}

const ShiftRow = () => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      shifts: [
        { shiftName: "", startTime: "", endTime: "", isDefault: false }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shifts"
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div className="bg-white mt-4 p-4 rounded-xl">
      <h2 className="font-semibold mb-4">Shift Management</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="relative  pb-4">

            {/* Row */}
            <div className="grid grid-cols-3 pr-12 gap-4 text-[#6D6F7A]">

              {/* Shift Name */}
              <div className="space-y-1">
                <Label className="text-xs ">
                  Shift name <span className="text-red-400">*</span>
                </Label>
                <Input
                  placeholder="e.g. General Shift"
                  className="text-xs"
                  {...register(`shifts.${index}.shiftName`)}
                />
              </div>

              {/* Start Time */}
              <div className="space-y-1">
                <Label className="text-xs">
                  Shift Starting Time <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Select time"
                    className="text-xs"
                    {...register(`shifts.${index}.startTime`)}
                  />
                  <Clock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* End Time */}
              <div className="space-y-1">
                <Label className="text-xs">
                  Shift Ending Time <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Select time"
                    className="text-xs"
                    {...register(`shifts.${index}.endTime`)}
                  />
                  <Clock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                  {/* Delete Icon */}
            <Trash2
              className=" p-1  text-red-400 absolute top-6  bg-red-100 right-3 cursor-pointer"
              onClick={() => remove(index)} size={24}
            />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 mt-2">
              <Checkbox {...register(`shifts.${index}.isDefault`)} />
              <span className="text-sm text-gray-600">
                Make this as your default shift
              </span>
            </div>

          
          </div>
        ))}

        {/* Add Button */}
        <Button
          type="button"
          variant="outline"
          className="border border-blue-600 text-blue-600"
          onClick={() =>
            append({
              shiftName: "",
              startTime: "",
              endTime: "",
              isDefault: false
            })
          }
        >
          + Add Shift
        </Button>
      </form>
    </div>
  )
}

export default ShiftRow