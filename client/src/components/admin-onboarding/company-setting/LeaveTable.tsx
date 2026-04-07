import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { LeaveResponseType, LeaveTypeType } from "@/lib/zodSchema"
import { Pencil, Trash2 } from "lucide-react"


 type LeaveTableProps = {
  leaves: LeaveResponseType[] 
  onDelete: (id: string) => void
  onEdit: (leave: LeaveTypeType) => void
}

const LeaveTable = ({ leaves=[], onDelete, onEdit }: LeaveTableProps) => {
  return (
    <div className="rounded-xl border overflow-hidden">
      <Table> 
        {/* Header */}
        <TableHeader className="bg-[#E8EDF5]">
          <TableRow>
            <TableHead className="px-6 py-3">Leave Name</TableHead>
            <TableHead className="px-6 py-3">Type</TableHead>
            <TableHead className="px-6 py-3">Number of Days</TableHead>
            <TableHead className="px-6 py-3">Status</TableHead>
            <TableHead className="px-6 py-3 text-right"></TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave._id} className="hover:bg-gray-50">
              
              <TableCell className="px-6 py-4">
                {leave.leaveName}
              </TableCell>

              <TableCell className="px-6 py-4 text-gray-500">
                {leave.leaveType}
              </TableCell>

              <TableCell className="px-6 py-4">
                {leave.creditedDays}
              </TableCell>

              {/* Status */}
              {/* <TableCell className="px-6 py-4"> */}
                {/* <span
                  className={`px-3 py-1 text-xs rounded-full border
                  ${
                    // leave.status === "Active"
                      // ? "text-green-600 border-green-400 bg-green-50"
                      // : "text-yellow-600 border-yellow-400 bg-yellow-50"
                  }`}
                >
                  
                </span> */}
              {/* </TableCell> */}

              {/* Actions */}
              <TableCell className="px-6 py-4 text-right">
                <div className="flex justify-end gap-4">
                  <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" onClick={()=> onEdit(leave)}/>
                  <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" onClick={()=> onDelete(leave._id)}/>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default LeaveTable