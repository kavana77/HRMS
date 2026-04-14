import type { PolicyType } from "@/lib/zodSchema"
import { deletePolicy, getPolicies, uploadPolicy } from "@/utils/http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
    const deletePolicyMutation = useMutation({
        mutationFn: (id: string)=>deletePolicy(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["policy"]})
        }
    })
    const {data: Policy} = useQuery({
        queryKey: ["Policy"],
        queryFn: getPolicies,
        select: (res)=> res.data
    })
    return{
        createPolicy : policyMutation.mutateAsync,
        Policy,
        deletePolicy : deletePolicyMutation.mutateAsync

    }
}