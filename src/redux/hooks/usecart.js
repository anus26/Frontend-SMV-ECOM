import { useSelector } from "react-redux"

const usecart=()=>{
const {loading,error}=useSelector(state=>state.cart)
return {loading,error}
}
export default usecart