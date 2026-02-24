import axios from "axios"
const token = localStorage.getItem("jwt"); 
const API=axios.create({
        baseURL:"https://colourful-edithe-anusraza123bm-19b0b6f2.koyeb.app/api/v1/Product",
        withCredentials:true,
         headers: { Authorization:`Bearer ${token}` },
})
export const productAdd=async(data)=>{
    const res=await API.post("/add",data)
    return res.data
}
export const getProducts=async()=>{
    const res=await API.get("/get")
    return res.data
}
export const updataProducts=async({id,data})=>{
    const res=await API.put(`/update/${id}`,data)
    return res.data
}
export const deleteProducts = async (id) => {
  const res = await API.delete(`/deleteproduct/${id}`); // use DELETE
  return res;
};

// export const getcategoryProducts=async()=>{
//     return await API.get(`/get/aMobile`,data)
    
// }
export const getcategoryProducts = async (parentslug, childslug) => {
  let url = `/get/${parentslug}`;
  if (childslug) url += `/${childslug}`;

  const res = await API.get(url);
  return res.data; // { message, products, parentCategory }
};
