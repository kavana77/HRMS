import { useState } from "react"
import { UploadCloud, Image, Trash2, File } from "lucide-react"
import { Label } from "@/components/ui/label"

type UploadStatus = "idle" | "uploading" | "success" | "error"
type FileUpload = {
  title: string,
  uploadTypes: "image" | "file"
  onFileChange?: (file: File) =>  void
}
const uploadConfig = {
  image: {
    maxSize: 2 * 1024 * 1024,
    accept: "image/*",
    label: "SVG, PNG, JPG or GIF (max. 2mb)"
  },
  file: {
    maxSize: 20 * 1024 * 1024,
    accept: ".pdf, .doc, .docx, .xls, .xlsx, .txt",
    label : "pfd, doc, xlsx, txt etc (max 20MB)"
  }
}


const FileUploads = ({uploadTypes,onFileChange,title}:FileUpload) => {
  const config = uploadConfig[uploadTypes]
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<UploadStatus>("idle")
 const MAX_SIZE = config.maxSize
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if(selected && onFileChange){
      onFileChange(selected)
    }
    if (!selected) return

    if (selected.size > MAX_SIZE) {
      setFile(selected)
      setStatus("error")
      setFileError(
    `File size exceeds ${
      uploadTypes === "image" ? "2 MB" : "20 MB"
    }. Please upload a smaller file.`
  )
      return
    }

    setFile(selected)
    setFileError(null)
    setStatus("uploading")

    let percent = 0

    const interval = setInterval(() => {
      percent += 10
      setProgress(percent)

      if (percent >= 100) {
        clearInterval(interval)
        setStatus("success")
      }
    }, 200)
  }

  const removeFile = () => {
    setFile(null)
    setProgress(0)
    setStatus("idle")
    setFileError(null)
  }

  return (
    <div className="space-y-2">
      <Label className="text-gray-500">
        {title} <span className="text-red-600">*</span>
      </Label>

      {/* DEFAULT STATE */}
      {!file && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-36 cursor-pointer text-gray-500 hover:border-blue-500 transition">
          
          <UploadCloud className="w-6 h-6 mb-2 text-blue-500" />

          <p className="text-sm">
            <span className="text-blue-500 font-medium">Click to upload</span> or drag and drop
          </p>

          <p className="text-xs text-gray-400">
            {config.label}
          </p>

          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={config.accept}
          />
        </label>
      )}

      {/* FILE STATE */}
      {file && (
        <>
          <div
            className={`border-2 border-dashed rounded-lg p-4 flex items-center justify-between
            ${status === "error" ? "border-red-600" : "border-gray-300"}`}
          >
            <div className="flex items-center gap-3">
              {uploadTypes === "image"? (
                <Image className="text-gray-400" />
              ):(
                <File className="text-gray-400"/>
              )}
              

              <div>
                <p className="text-sm font-medium">{file.name}</p>

                {/* uploading */}
                {status === "uploading" && (
                  <>
                    <p className="text-xs text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} mb
                    </p>

                    <div className="w-64 h-2 bg-gray-200 rounded mt-2">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-sm mt-1">{progress}%</p>
                  </>
                )}

                {/* success */}
                {status === "success" && (
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} mb - Successfully uploaded.
                  </p>
                )}

                {/* error message inside card */}
                {status === "error" && (
                  <p className="text-sm text-gray-500">
                    Upload failed, please{" "}
                    <span className="text-blue-500 cursor-pointer underline">
                      try again
                    </span>
                  </p>
                )}
              </div>
            </div>

            <Trash2
              className="text-red-600 cursor-pointer"
              onClick={removeFile}
            />
          </div>

          {/* error text OUTSIDE container */}
          {status === "error" && fileError && (
            <p className="text-sm text-red-600">{fileError}</p>
          )}
        </>
      )}
    </div>
  )
}

export default FileUploads