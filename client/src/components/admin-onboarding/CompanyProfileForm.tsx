import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import LocationSelector from "./LocationSelector"
import FileUploads from "./FileUpload"

type FormData = {
  companyName: string
  address: string
  pincode: string
}

const CompanyProfileForm = () => {

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormData>({
    mode: "onChange"
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Company Name */}
      <div className="space-y-2">
        <Label className="text-gray-500">
          Company Name 
        </Label>

        <Input
          className="py-5"
          {...register("companyName", { required: true })}
        />
      </div>

      {/* Upload */}
      <FileUploads
      uploadTypes="image" />

      {/* Address */}
      <div className="space-y-2">
        <Label className="text-gray-500">
          Registered Address <span className="text-red-500">*</span>
        </Label>

        <Input
          placeholder="e.g. Park St."
          className="py-5"
          {...register("address", { required: true })}
        />
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <Label className="text-gray-500">
          Pincode <span className="text-red-500">*</span>
        </Label>

        <Input
          placeholder="e.g. 100012"
          className="py-5"
          {...register("pincode", { required: true })}
        />
      </div>

      {/* Country & State */}
      <LocationSelector />

      {/* Button */}
      <Button
        className="w-full"
        type="submit"
        disabled={!isValid}
      >
        Save
      </Button>

    </form>
  )
}

export default CompanyProfileForm