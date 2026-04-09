import type { AdminLoginType, LeaveTypeType } from "@/lib/zodSchema"

export interface AdminSignUp {
    fullName: string,
    companyName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
} 
const authorizedFetch = async(endpoint: string, options: RequestInit={})=>{
    const token = localStorage.getItem("token")
    const response = await fetch(`https://hrms-6-inr1.onrender.com/api${endpoint}`,{
        ...options,
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers
        }
    })
    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Access denied")
    }
    return response.json()
}
export const adminSignup = async(data:AdminSignUp)=>{
 return authorizedFetch("/auth/admin/signup",{
    method: "POST",
    body: JSON.stringify(data)
 })
}
export const adminLogin = async(data: AdminLoginType)=>{
    return authorizedFetch("/auth/admin/login",{
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const addHoliday = async(data: {holidayName: string, holidayDate: string})=>{
    return authorizedFetch("/holiday/add",{
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const getHolidays = async()=>{
    return authorizedFetch("/holiday/get",{
        method: "GET"
    })
}

export const editHoliday = async(id: string, data: {holidayName: string, holidayDate: string})=>{
    return authorizedFetch(`/holiday/update/${id}`,{
        method: "PUT",
        body: JSON.stringify(data)
    })
}
export const deleteHoliday = async(id: string) =>{
    return authorizedFetch(`/holiday/delete/${id}`,{
        method: "DELETE"
    })
}

export const addLeave = async(data: LeaveTypeType)=>{
    return authorizedFetch("/leave/create", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const getLeaves = async()=>{
    const res = await authorizedFetch("/leave/get-all",{
        method: "GET"
    })
    console.log("API RESPONSE:", res)
    return res
}

export const deleteLeave = async(id: string) => {
    return authorizedFetch(`/leave/delete/${id}`,{
        method: "DELETE"
    })
}
export const editLeave = async(id: string, data: LeaveTypeType)=>{
    return authorizedFetch(`/leave/update/${id}`,{
        method: "PUT",
        body: JSON.stringify(data)
    })
}
export const getLeaveById = async(id: string) => {
    return authorizedFetch(`/leave/get/${id}`,{
        method: "GET"
    })
}
export const updateLeaveStatus = async(id: string, status: string)=>{
    return authorizedFetch(`/leave/update-status/${id}`,{
        method: "PUT",
        body: JSON.stringify({status})
    })
}

export const uploadPolicy = async(data: {
    policyName: string;
    category: string;
    effectiveFrom: string;
    status: "Active" | "Draft"
},file?: File)=>{
    const formData = new FormData()
    formData.append("policyName", data.policyName);
    formData.append("category", data.category);
    formData.append("effectiveFrom", data.effectiveFrom);
    formData.append("status", data.status)

    if(file){
        formData.append("file", file)
    }
    return authorizedFetch("/policy/create",{
        method: "POST",
        body: formData,

    })
}