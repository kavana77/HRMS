import { getTodayAttendance, punchInApi, punchOutApi } from "@/utils/http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAttendance = () => {
    const queryClient = useQueryClient()

    const statusQuery = useQuery({
        queryKey: ["attendance-today"],
        queryFn: getTodayAttendance
    })

    const punchInMutation = useMutation({
        mutationFn: punchInApi,
        onSuccess: ()=> {
            queryClient.invalidateQueries({
                queryKey: ["attendance-today"]
            })
        }
    })

    const punchOutMutation = useMutation({
        mutationFn: punchOutApi,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ["attendance-today"]
            })
        }
    })
    return {
        statusQuery,
        punchInMutation,
        punchOutMutation
    }
}