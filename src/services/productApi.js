import axios from "axios"

const API=axios.create({
        baseURL:"http://localhost:4000/api/v1/product",
        withCredentials:true,
         headers: { "Content-Type": "multipart/form-data" },
})
export const productAdd=async(data)=>{
    const res=await API.post("/add",data)
    return res.data
}
export const getProducts=async()=>{
    const res=await API.get("/get")
    return res.data
}
export const updataProducts=async()=>{
    const res=await API.get(`/update/${id}`,data)
    return res.data
}