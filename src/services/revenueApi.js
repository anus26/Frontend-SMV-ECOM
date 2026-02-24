import axios from "axios"

const API=axios.create({
        baseURL:"https://colourful-edithe-anusraza123bm-19b0b6f2.koyeb.app/api/v1/revenue",
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