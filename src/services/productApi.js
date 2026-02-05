import axios from "axios"

const API=axios.create({
        baseURL:"http://localhost:4000/api/v1/product",
})
export const productAdd=async(data)=>{
    const res=await API.post("/add",data)
    return res.data
}
export const getProducts=async()=>{
    const res=await API.get("/get")
    return res.data
}