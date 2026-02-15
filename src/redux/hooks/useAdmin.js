import React from 'react'
import { useSelector } from 'react-redux'

const useAdmin = () => {
    const {users,stats,loading,error}=useSelector(state=>state.admin)
  return {users,stats,loading,error}
}

export default useAdmin