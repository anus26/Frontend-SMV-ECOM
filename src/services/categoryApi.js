import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:4000/api/v1/category",
    withCredentials:true
})

export const addCategory=async(data)=>{
    const res=await API.post("/add",data)
    return res.data
}
export const getCategory=async(data)=>{
    const res=await API.get("/getall",data)
    return res.data
}
