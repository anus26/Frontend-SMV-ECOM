import { useSelector } from "react-redux"

const useProduct=()=>{
const {loading,error,products}=useSelector(state=>state.product)
return {loading,error,products}
}
export default useProduct