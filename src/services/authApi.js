import axios from "axios"

const API=axios.create({
     baseURL:"https://civic-marti-anusraza123bm-c88fd7a4.koyeb.app/api/v1/user",
     withCredentials:true
    })
export const SignupApi=async(data)=>{
    const res=await API.post("/signup",data)
    return res.data
    
    
}
export const SigninApi=async(data)=>{
    const res=await API.post("/signin",data)
    return res.data
}
export const getMe=async(data)=>{
    const res=await API.get("/me",data)
    return res.data
}
export const logout=async()=>{
    const res=await API.post(`/logout`)
    return res.data
}