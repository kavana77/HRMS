type LoginPayload ={
    email: string,
    password: string
}
export const loginApi = async(data:LoginPayload )=>{
    const response = await fetch('https://hrms-5-z5lv.onrender.com/api/auth/login',{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error("Failed to login")
    }
    return response.json()
}
type SetPasswordPayload = {
    password: string
    confirmPassword: string
}
export const setPasswordApi = async(data: SetPasswordPayload)=>{
    const response = await fetch('https://hrms-5-z5lv.onrender.com/api/auth/register',{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error("Failed to set Password")
    }
    return response.json()
}

const authorizedFetch = async (endpoint: string)=>{
    const token = localStorage.getItem("token")
    const response = await fetch(`https://hrms-5-z5lv.onrender.com/api${endpoint}`,{
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message ||"Access denied")
    }
    return response.json()
}
//Admin API
export const getAdminDashboard = ()=>{
    return authorizedFetch("/admin")
}
//Manager API
export const getManagerDashboard = ()=>{
    return authorizedFetch("/manager")
}
//Employee API
export const getEmployeeDashboard = ()=>{
    return authorizedFetch("/employee")
}