import axios from "axios";

const API=axios.create({
        baseURL:"https://tired-lauretta-anusraza123bm-8108bb8c.koyeb.app/api/v1/order",
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
export const orderupdata=async({id,orderStatus})=>{
const res=  await API.put(`/updateorder/${id}`,{orderStatus})
 return res.data
}
export const orderdelete = async (id) => {
  const res = await API.delete(`/orderdelete/${id}`);
  return res.data
};
export const ordercustomer=async(id)=>{
    const res=await API.get(`/order/${id}`)

    return res.data
}
