import { useSelector } from "react-redux"

const usecart=()=>{
const {loading,error,product}=useSelector(state=>state.cart)
return {loading,error,product}
}
export default usecart