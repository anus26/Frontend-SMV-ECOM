import { useSelector } from "react-redux"

const usebuy=()=>{
    const {buy,loading,error}=useSelector((state)=>state.buy)
    return {loading,error,buy}
}
export default usebuy