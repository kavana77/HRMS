import type { PolicyType } from "@/lib/zodSchema"
import { uploadPolicy } from "@/utils/http"
import { useMutation, useQueryClient } from "@tanstack/react-query"
type PolicyInput = {
    data: PolicyType
    file?: File
}
export const usePolicy = () =>{
    const queryClient = useQueryClient()
    const policyMutation = useMutation({
        mutationFn:({data, file}: PolicyInput) => uploadPolicy(data,file),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["policy"] })
        }
    })
    return{
        createPolicy : policyMutation.mutateAsync
    }
}