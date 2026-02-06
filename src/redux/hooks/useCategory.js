import React from 'react'
import { useSelector } from 'react-redux'

const useCategory = () => {
    const {  categories ,loading,error}=useSelector(state=>state.category)
  return {  categories,loading,error}

  
}

export default useCategory