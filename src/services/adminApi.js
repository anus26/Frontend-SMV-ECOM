import axios from "axios"

const API=axios.create({
     baseURL:"https://civic-marti-anusraza123bm-c88fd7a4.koyeb.app/api/v1/admin",
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
