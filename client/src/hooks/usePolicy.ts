import type { PolicyType } from "@/lib/zodSchema"
import { deletePolicy, getPolicies, updatePolicy, uploadPolicy } from "@/utils/http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
type PolicyInput = {
    data: PolicyType
    file?: File
}
export const usePolicy = () => {
    const queryClient = useQueryClient()
    const policyMutation = useMutation({
        mutationFn: ({ data, file }: PolicyInput) => uploadPolicy(data, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["policy"] })
        }
    })
    const deletePolicyMutation = useMutation({
        mutationFn: (id: string) => deletePolicy(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["policy"] })
        }
    })
    const updateMutation = useMutation({
        mutationFn: ({ id, data, file }: any) => updatePolicy(id, data, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['policy'] })
        }
    })
    const { data: policies, isLoading, isError } = useQuery({
        queryKey: ["policy"],
        queryFn: getPolicies,
        select: (res) => res.data
    })
    return {
        createPolicy: policyMutation.mutateAsync,
        policies,
        isLoading,
        isError,
        deletePolicy: deletePolicyMutation.mutateAsync,
        updatePolicy: updateMutation.mutateAsync

    }
}