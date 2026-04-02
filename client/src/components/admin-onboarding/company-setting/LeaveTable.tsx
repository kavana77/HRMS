import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

type Leave = {
  id: number
  name: string
  type: string
  days: number
  status: "Active" | "Pending"
}

const leaves: Leave[] = [
  { id: 1, name: "Sick Leave", type: "Paid", days: 1, status: "Active" },
  { id: 2, name: "Maternity Leave", type: "Paid", days: 25, status: "Pending" },
  { id: 3, name: "Casual Leave", type: "Paid", days: 1, status: "Pending" },
  { id: 4, name: "Casual Leave", type: "Paid", days: 1, status: "Active" },
  { id: 5, name: "Compensatory Off", type: "Paid", days: 2, status: "Active" },
]

const LeaveTable = () => {
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
            <TableRow key={leave.id} className="hover:bg-gray-50">
              
              <TableCell className="px-6 py-4">
                {leave.name}
              </TableCell>

              <TableCell className="px-6 py-4 text-gray-500">
                {leave.type}
              </TableCell>

              <TableCell className="px-6 py-4">
                {leave.days}
              </TableCell>

              {/* Status */}
              <TableCell className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full border
                  ${
                    leave.status === "Active"
                      ? "text-green-600 border-green-400 bg-green-50"
                      : "text-yellow-600 border-yellow-400 bg-yellow-50"
                  }`}
                >
                  {leave.status}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="px-6 py-4 text-right">
                <div className="flex justify-end gap-4">
                  <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" />
                  <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
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