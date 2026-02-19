import axios from "axios"

const API=axios.create({
        baseURL:"https://civic-marti-anusraza123bm-c88fd7a4.koyeb.app/api/v1/revenue",
        withCredentials:true,
    
})

export const revenueget=async(data)=>{
    const res=await API.get("/gettotal",data)
    return res.data
}
export const revenuedaily=async(data)=>{
    const res=await API.get("/getdaily",data)
    return res.data
}
export const revenuemonthly=async(data)=>{
    const res=await API.get("/getmonthly",data)
    return res.data
}