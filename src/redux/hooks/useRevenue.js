import React from 'react'
import { useSelector } from 'react-redux'

const useRevenue = () => {
  const { loading, error, total, daily, monthly } =
    useSelector((state) => state.revenue)

  return { loading, error, total, daily, monthly }
}


export default useRevenue