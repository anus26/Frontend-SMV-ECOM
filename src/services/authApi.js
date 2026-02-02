import axios from "axios"

const API=axios.create({
     baseURL:"http://localhost:4000/api/v1/user",
     withCredentials:true
    })
export const SignupApi=async(data)=>{
    const res=await API.post("/signup",data)
    return res.data
    
    
}
export const SigninApi=async(data)=>{
    const res=await axios.post("/signin",data)
    return res.data
}