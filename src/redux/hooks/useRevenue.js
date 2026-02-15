import React from 'react'
import { useSelector } from 'react-redux'

const useRevenue = () => {
    const {loading,error,revenue}=useSelector(state=>state.revenue)
  return {loading,error,revenue}
}

export default useRevenue