import axios from "axios";

const  API=axios.create({
    baseURL:"http://localhost:4000/api/v1/buyer",
    withCredentials:true
})

export const buyadd=async(data)=>{
    const res=await API.post("/buy",data)
    return res.data
}
export const getbuy=async(data)=>{
    const res=await API.get("/getbuybyuser",data)
    return res.data
}
