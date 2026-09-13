import axios from "axios";

const  API=axios.create({
    baseURL:"https://tired-lauretta-anusraza123bm-8108bb8c.koyeb.app/api/v1/buyer",
    withCredentials:true
})

export const buyadd=async(data)=>{
    const res=await API.post("/buy",data)
    return res.data
}
export const getbuy=async()=>{
    const res=await API.get("/getbuybyuser")
    return res.data
}
