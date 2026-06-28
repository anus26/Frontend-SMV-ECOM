import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { productApI } from "../slices/productSlice"

const useProduct=()=>{
    const dispatch=useDispatch()
const {loading,error,products}=useSelector(state=>state.product)
useEffect(()=>{
    if(products.length===0){
        dispatch(productApI())
    }
},[dispatch])
return {loading,error,products}
}
export default useProduct