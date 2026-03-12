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
    const response = await fetch(`http://localhost:4000/api${endpoint}`,{
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