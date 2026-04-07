import type { LeaveTypeType } from "@/lib/zodSchema"
import { addLeave, deleteLeave, editLeave, getLeaveById, getLeaves } from "@/utils/http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useLeave = () =>{
    const queryClient = useQueryClient()
    const leaveMutations = useMutation({
        mutationFn: (data: LeaveTypeType) => addLeave(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leaves"] })
        }
    })
    const {data: leaves=[]} = useQuery({
        queryKey: ["leaves"],
        queryFn: getLeaves,
        select: (res)=> res.data
    })
    const {data: leaveById} = useQuery({
        queryKey: ["leaveById"],
        queryFn: ({queryKey}) => getLeaveById(queryKey[1] as string),
    })
    const deleteLeaveMutation = useMutation({
        mutationFn: (id: string) => deleteLeave(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["leaves"]})
        }
    })
    const updateLeaveMutation = useMutation({
        mutationFn: ({id, data}: {id: string, data: LeaveTypeType}) => editLeave(id, data),
            onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["leaves"] })
  }
    })

    return {
        addLeave: leaveMutations.mutateAsync,
        leaves,
        leaveById,
        deleteLeave: deleteLeaveMutation.mutateAsync,
        updateLeave: updateLeaveMutation.mutateAsync
    }
}