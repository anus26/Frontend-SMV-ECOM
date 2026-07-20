import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import useorder from '../../redux/hooks/useorder'
import useProduct from '../../redux/hooks/useProduct'

const UserOrder = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const {orders}=useorder()
    const {products}=useProduct()
    const product=products.find((items)=> items.id===id)
  return (
    <>

    <div>Order</div>
    </>
  )
}

export default UserOrder