import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
type Holiday = {
    _id: string,
    holidayName: string,
    holidayDate: string
}
type HolidayListProps = {
    holidays: Holiday[]
    onDelete: (id: string) => void
    onEdit: (holiday: Holiday) => void
}
const HolidayList = ({ holidays, onDelete, onEdit }: HolidayListProps) => {
    return (
        <div className="rounded-xl border overflow-hidden">
            <Table>
                {/* Header */}
                <TableHeader className="bg-[#E8EDF5]">
                    <TableRow>
                        <TableHead className="px-6 py-3">Holiday Name</TableHead>
                        <TableHead className="px-6 py-3">Day</TableHead>
                        <TableHead className="px-6 py-3">Date</TableHead>
                        <TableHead className="px-6 py-3 text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                {/* Body */}
                <TableBody>
                    {/* Map through holidays and display them here */}
                    {holidays.map((holiday) => {
                        const date = new Date(holiday.holidayDate)
                        return (

                            <TableRow key={holiday._id} className="hover:bg-gray-50">
                                <TableCell className="px-6 py-4 text-gray-500 text-[13px]">{holiday.holidayName}</TableCell>
                                {/* Day */}
                                <TableCell className="px-6 py-4 text-gray-500 text-[13px]">
                                    {date.toLocaleDateString("en-IN", { weekday: "long" })}
                                </TableCell>

                                {/* Date */}
                                <TableCell className="px-6 py-4 text-gray-500 text-[13px]">
                                    {date.toLocaleDateString("en-IN")}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-8">
                                        <Pencil className="w-3 h-3 text-blue-500 cursor-pointer" onClick={() => onEdit(holiday)} />
                                        <Trash2 className="w-3 h-3 text-red-500 cursor-pointer" onClick={() => onDelete(holiday._id)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </div>
    )
}
export default HolidayList