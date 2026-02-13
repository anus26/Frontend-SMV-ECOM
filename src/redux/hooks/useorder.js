import { useSelector } from "react-redux"

const useorder=()=>{
   const {loading,orders,error}=useSelector(state=>state.order) 
   return {loading,orders,error}
}
export default useorder