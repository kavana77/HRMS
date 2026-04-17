import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import LocationSelector from "./LocationSelector"
import FileUploads from "./FileUpload"
import { companySetup } from "@/utils/http"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

type FormData = {
  companyName: string
  address: string
  pincode: string
}

const CompanyProfileForm = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File |null>(null)
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const companyName = localStorage.getItem("companyName") || ""
  const {
    register,
    handleSubmit,
    formState: { isValid ,isLoading}
  } = useForm<FormData>({
    mode: "onChange"
  })

  const onSubmit =async (data: FormData) => {
    try {
      
      await companySetup(
        {
          companyName: data.companyName,
          registeredAddress: data.address,
          pincode: data.pincode,
          state,
          country,
        },
        file || undefined
      )
      localStorage.removeItem("companyName")
      navigate("/admin/workspace-setup")
    } catch (error) {
      console.error("Company setup failed", error)
    }
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
          defaultValue={companyName}
          disabled
          {...register("companyName", { required: true })}
        />
      </div>

      {/* Upload */}
      <FileUploads
      title="Company Logo"
      uploadTypes="image" 
      onFileChange={setFile}/>

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
      <LocationSelector
      setState={setState}
      setCountry={setCountry} />

      {/* Button */}
      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={!isValid}
      >
        {isLoading ? "Saving...":"Save"}
      </Button>

    </form>
  )
}

export default CompanyProfileForm