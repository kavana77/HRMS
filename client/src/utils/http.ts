import type { AdminLoginType, LeaveTypeType } from "@/lib/zodSchema"

export interface AdminSignUp {
    fullName: string,
    email: string,
    companyName: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
} 

const authorizedFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers: any = {
    Authorization: `Bearer ${token}`,
    ...options.headers
  };

  //Only set JSON header if NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`https://hrms-6-inr1.onrender.com/api${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};
export const adminSignup = async (data: AdminSignUp) => {
 

  const response = await fetch("https://hrms-6-inr1.onrender.com/api/auth/admin/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullName: data.fullName,
      companyName: data.companyName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      confirmPassword: data.confirmPassword
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
};
export const adminLogin = async (data: AdminLoginType) => {
  const res = await authorizedFetch("/auth/admin/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
  // store token
  localStorage.setItem("token", res.token);
  // store companyName (IMPORTANT)
  localStorage.setItem("companyName", res.user.companyName);

  return res;
};
export const firstLoginComplete = async () => {
  const res = await authorizedFetch("/auth/complete-first-login", {
    method: "PUT"
  })

  if (!res.ok) {
    throw new Error("Failed to update first login")
  }

  return res.json()
}
export const companySetup = async (
    data: {
        companyName: string,
        registeredAddress: string,
        pincode: string,
        state: string,
        country: string
    },
    file?: File
)=>{
    const formData = new FormData()

    formData.append("companyName", data.companyName)
    formData.append("registeredAddress", data.registeredAddress)
    formData.append("pincode", data.pincode)
    formData.append("state", data.state)
    formData.append("country", data.country)
    if(file){
        formData.append("image", file)
    }
    return authorizedFetch("/company/setup-company",{
        method:"POST",
        body: formData
    })
}
export const getCompanyProfile = ()=>{
    return authorizedFetch("/company/get-company",{
        method:"GET"
    }
        
    )
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
export const getPolicies = async()=>{
    return authorizedFetch("/policy/get",{
        method:"GET"
    })
}
export const deletePolicy = (id:string)=>{
    return authorizedFetch(`/policy/delete/${id}`,{
        method: "DELETE"
    })
}