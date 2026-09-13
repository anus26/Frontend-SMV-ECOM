import axios from "axios";

const API=axios.create({
    baseURL:"https://tired-lauretta-anusraza123bm-8108bb8c.koyeb.app/api/v1/category",
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
export const getslugCategory=async(data)=>{
    const res=await API.get( `/get/aMobile-Mobile`,data)
    return res.data
}
