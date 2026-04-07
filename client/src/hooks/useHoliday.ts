import { addHoliday, deleteHoliday, editHoliday, getHolidays } from "@/utils/http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useHoliday = () => {
    const queryClient = useQueryClient()
    const holidayMutations = useMutation({
        mutationFn: (data: {holidayName: string, holidayDate: string})=> addHoliday(data),
        onSuccess: (res)=>{
                console.log("Holiday added successfully", res)
                queryClient.invalidateQueries({queryKey: ["holidays"]})
        }
    })
    const deleteHolidayMutation = useMutation({
        mutationFn: (id: string) => deleteHoliday(id),
        onSuccess: ()=>{
            console.log("Holiday deleted successfully")
            queryClient.invalidateQueries({queryKey: ["holidays"]})
        }
    })
    const updateHolidayMutation = useMutation({
        mutationFn: ({id, data}: {id: string, data: {holidayName: string, holidayDate: string}}) => editHoliday(id, data),
         onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["holidays"] })
  }
    })
    const {data: holidays = []} = useQuery({
        queryKey: ["holidays"],
        queryFn: getHolidays,
        select: (res)=> res.data
    })
    return {
        addHoliday: holidayMutations.mutateAsync,
        deleteHoliday: deleteHolidayMutation.mutateAsync,
        updateHoliday: updateHolidayMutation.mutateAsync,
        holidays,
    }
}