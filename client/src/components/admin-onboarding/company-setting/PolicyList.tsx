import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PolicyResponseType } from "@/lib/zodSchema"
import { Pencil, Trash2 } from "lucide-react"
type PolicyProps = {
    policies: PolicyResponseType[]
    onEdit: (policy: PolicyResponseType) => void
    onDelete: (id: string) => void
}
const PolicyList = ({ policies = [], onDelete, onEdit }: PolicyProps) => {
   
    return (
        <div className="rounded-xl border overflow-hidden">
            <Table>
                <TableHeader className="bg-[#E8EDF5]">
                    <TableRow>
                        <TableHead className="px-6 py-3">Policy Name</TableHead>
                        <TableHead className="px-6 py-3">Category</TableHead>
                        <TableHead className="px-4 py-3">Effective From</TableHead>
                        <TableHead className="px-4 py-3">Status</TableHead>
                        <TableHead className="px-4 py-3 text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {policies.map((policy) => {
                        const date = new Date(policy.effectiveFrom)
                         const isEditable = policy.status === "Draft";
                        return (
                            <TableRow key={policy._id}>
                                <TableCell className="px-6 py-4">
                                    {policy.policyName}
                                </TableCell>
                                <TableCell className="px-11 py-4">
                                    {policy.category}
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    {date.toLocaleDateString("en-In")}
                                </TableCell>
                                <TableCell className="">
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full border
                                        ${policy.status === "Active"
                                                ? "text-green-600 border-green-400 bg-green-50"
                                                : "text-yellow-600 border-yellow-400 bg-yellow-50"
                                            }`}
                                    > {policy.status}</span>

                                </TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-8">
                                        <Pencil
                                            className={`w-3 h-3 ${isEditable
                                                    ? "text-blue-500 cursor-pointer"
                                                    : "text-gray-300 cursor-not-allowed"
                                                }`}
                                            onClick={() => {
                                                if (!isEditable) return;
                                                onEdit(policy);
                                            }}
                                        />
                                        <Trash2 className="w-3 h-3 text-red-500 cursor-pointer" onClick={() => onDelete(policy._id)} />
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
export default PolicyList