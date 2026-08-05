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
  <div className=" flex justify-center items-center text-center ml-96 m-4 ">
    <div className="max-w-5xl mx-auto px-4 py-8 ">

      {/* Page Heading */}
      <div className="mb-6 ">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          My Orders
        </h1>
        <p className="text-sm text-text mt-1">
          Track and manage your orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className=" rounded-xl shadow-sm border   ">
          <h2 className="text-xl font-semibold ">
            No Orders Found
          </h2>

          <p className=" mt-2">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (

        <div className="space-y-5  ">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-xl  border border-gray2 shadow-md overflow-hidden " 
            >

              {/* ================= HEADER ================= */}

              <div className="px-5 py-4 border-b border-gray2 bg-gray">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div>
                    <p className="text-md text-black font-bold  uppercase">
                      Order ID
                    </p>

                    <h2 className="font-bold text-text">
                      #{order._id.slice(-8)}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">

                    <span className="text-md text-black font-semibold">
                      Order Status
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green1"
                          : order.status === "pending"
                          ? "bg-hover text-white"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red1"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

              </div>


              {/* ================= PRODUCTS ================= */}

              <div className="p-5">

                <h3 className="font-semibold  mb-4">
                  Order Items
                </h3>

                <div className="space-y-4">

                  {order.items?.map((item, index) => {

                    const product = item.productId;

                    return (
                      <div
                        key={item._id || index}
                        className="flex flex-col sm:flex-row gap-4 p-3 rounded-lg border border-text hover:shadow-sm transition"
                      >

                        {/* IMAGE */}

                        <div className="w-full sm:w-28 flex justify-center">

                          <img
                            src={product?.images?.[0]}
                            alt={product?.title}
                            className="w-28 h-28 object-cover rounded-lg border"
                          />

                        </div>


                        {/* PRODUCT INFO */}

                        <div className="flex-1">

                          <h2 className="font-semibold text-base md:text-lg">
                            {product?.title}
                          </h2>

                          <p className="text-sm  mt-2">
                            Quantity:{" "}
                            <span className="text-gray-700 font-medium">
                              {item.quantity}
                            </span>
                          </p>

                          <p className="text-sm  mt-1">
                            Seller:{" "}
                            <span className="">
                              Seller
                            </span>
                          </p>

                        </div>


                        {/* PRICE */}

                        <div className="sm:text-right flex sm:block justify-between items-center">

                          <p className="text-xs ">
                            Item Price
                          </p>

                          <p className="text-lg font-bold text-orange-600">
                            Rs {item.price}
                          </p>

                        </div>

                      </div>
                    );

                  })}

                </div>

              </div>


              {/* ================= FOOTER ================= */}

              <div className="border-t border-gray2 px-5 py-5 ">

                <div className="flex flex-col md:flex-row md:justify-between gap-6">

                  {/* ADDRESS */}

                  <div className="flex-1">

                    <p className="text-xs uppercase  mb-2">
                      Delivery Address
                    </p>

                    <div className="bg-white border border-text rounded-lg p-3">

                      <p className="text-sm ">
                        {order?.buyerId?.AddressType ||
                          "Address not available"}
                      </p>

                    </div>

                  </div>


                  {/* TOTAL */}

                  <div className="md:w-56">

                    <div className="flex justify-between text-sm ">
                      <span>Items Total</span>
                      <span>
                        Rs {order.totalAmount}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm  mt-2">
                      <span>Shipping</span>
                      <span>Rs 0</span>
                    </div>

                    <div className="border-t border-gray2 my-3"></div>

                    <div className="flex justify-between items-center">

                      <span className="font-semibold ">
                        Total
                      </span>

                      <span className="text-xl font-bold ">
                        Rs {order.totalAmount}
                      </span>

                    </div>

                  </div>

                </div>


                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">

                

                  {order.status === "Delivered" && (
                    <button
                      className="px-5 py-2 bg-green text-white rounded-lg
                      text-sm font-medium hover:bg-green1 transition"
                    >
                      Buy Again
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  </div>
);
}

export default UserOrder