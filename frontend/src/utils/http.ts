type LoginPayload ={
    email: string,
    password: string
}
export const loginApi = async(data:LoginPayload )=>{
    const response = await fetch('http://localhost:3000/api/auth/login',{
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
    const response = await fetch('http://localhost:3000/api/auth/register',{
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