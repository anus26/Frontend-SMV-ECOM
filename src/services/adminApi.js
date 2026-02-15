import axios from "axios"

const API=axios.create({
     baseURL:"http://localhost:4000/api/v1/admin",
     withCredentials:true
    })

export const getuser=async(data)=>{
    const res=await API.get("/user",data)
    return res.data
    
    
} 
export const approveseller=async(id)=>{
    const res=await API.put(`/approve/${id}`)
    return res.data
    
    
} 
export const blockseller=async(id)=>{
    const res=await API.put(`/block/${id}`)
    return res.data
    
    
} 
export const stats=async(data)=>{
    const res=await API.get("/stats",data)
    return res.data
    
    
} 
