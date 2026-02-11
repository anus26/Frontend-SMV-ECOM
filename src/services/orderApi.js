import axios from "axios";

const API=axios.create({
        baseURL:"http://localhost:4000/api/v1/order",
        withCredentials:true,
      
})
export const orderAdd=async(data)=>{
    const res=await API.post("/orderadd",data)
    return res.data
}