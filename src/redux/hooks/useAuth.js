import React from 'react'
import { useSelector } from 'react-redux'

const useAuth = () => {
    const {loading,error,user}=useSelector(state=>state.auth)
    return {

      loading,
      error,
      user
 
    }
}

export default useAuth