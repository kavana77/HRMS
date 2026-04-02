import type { AdminLoginType, AdminSignUpType } from "@/lib/zodSchema"
import { adminLogin, adminSignup } from "@/utils/http"
import { useMutation } from "@tanstack/react-query"

export const useAuth = () => {
    const signupMutation = useMutation({
        mutationFn: (data: AdminSignUpType) => adminSignup(data),
        onSuccess: (res) => {
            localStorage.setItem("token", res.token)
        }
    })
    const loginMutation = useMutation({
        mutationFn: (data: AdminLoginType) => adminLogin(data),
        onSuccess: (res) =>{
            localStorage.setItem("token", res.token)
        }
    })
    return {
        login: loginMutation.mutateAsync,
        signup: signupMutation.mutateAsync
    }
}