import axios from "axios";

const API=axios.create({
        baseURL:"https://civic-marti-anusraza123bm-c88fd7a4.koyeb.app/api/v1/order",
        withCredentials:true,
      
})
export const orderAdd=async(data)=>{
    const res=await API.post("/orderadd",data)
    return res.data
}
export const allorder=async(data)=>{
    const res=await API.get("/allorder",data)
    return res.data
}
export const orderupdata=async({id,status})=>{
const res=  await API.put(`/updateorder/${id}`,{status})
 return res.data
}
export const orderdelete=async(id)=>{
    return res=await API.delete(`/orderdelete/${id}`)
}
