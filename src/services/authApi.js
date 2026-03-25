import axios from "axios"

const API=axios.create({
     baseURL:"https://colourful-edithe-anusraza123bm-19b0b6f2.koyeb.app/api/v1/user",
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
export const forgot=async(data)=>{
    const res=await API.post("/forgot",data)
    return res.data
}
export const verify=async(data)=>{
    const res=await API.post("/verify",data)
    return res.data
}
export const resetpassword=async(data)=>{
    const res=await API.post("/reset",data)
    return res.data
}
export const resendotp=async(data)=>{
    const res=await API.post("/resendotp",data)
    return res.data
}