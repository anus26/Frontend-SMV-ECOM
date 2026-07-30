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
      // dispatch(ordergetThunk())
      dispatch(orderallThunk(id))

    
      
    },[dispatch,])

  return (
    <>

   <div className="max-w-6xl mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6">My Orders</h1>

  {orders.length === 0 ? (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h2 className="text-xl font-semibold">No Orders Found</h2>
    </div>
  ) : (
    orders.map((order) => (
      <div
        key={order._id}
        className="bg-white rounded-xl shadow-md border mb-6 overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <div>
            <h2 className="font-semibold">
              Order #{order._id.slice(-6)}
            </h2>
            <p className="text-sm text-gray-500">
              Status: {order.status}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm
              ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
          >
            {order.status}
          </span>
        </div>

        {/* Products */}
        <div className="p-4 space-y-4">
          {order.items?.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>

                <p className="text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="text-green font-bold">
                  Rs {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">
              Shipping Address
            </p>

            <p className="font-medium">
              {order.shippingAddress}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Total
            </p>

            <p className="text-xl font-bold text-green">
              Rs {order.totalAmount}
            </p>
          </div>
        </div>
      </div>
    ))
  )}
</div>
    </>
  )
}

export default UserOrder