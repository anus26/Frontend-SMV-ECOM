import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import useorder from '../../redux/hooks/useorder'
import useProduct from '../../redux/hooks/useProduct'
import { orderallThunk, ordergetThunk } from '../../redux/slices/orderSlice'

const UserOrder = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const {orders}=useorder()
    const {products}=useProduct()
    const product=products.find((items)=> items.id===id)
    useEffect(()=>{
      dispatch(ordergetThunk())
      dispatch(orderallThunk())
      console.log();
      
    },[dispatch])

  return (
    <>

    <div>Order</div>
  
    {orders.map((order)=>(
     < div key={order._id}>
        <h1>Order ID: {order._id}</h1>
        <p>Status: {order.status}</p>
        </div>
      ))}

    </>
  )
}

export default UserOrder