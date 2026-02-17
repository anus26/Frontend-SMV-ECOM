import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import { orderThunk } from "../../redux/slices/orderSlice";
import useAuth from "../../redux/hooks/useauth";
import toast from "react-hot-toast";

const Cartpage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useAuth();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <FaShoppingBag className="text-6xl text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-600">
          Your Cart is Empty
        </h1>
      </div>
    );
  }

  const handCheckout = () => {
    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: Number(item.quantity),
      })),
      totalAmount,
    };
    
    dispatch(orderThunk(orderData))
    .unwrap()
    .then(() => {
      dispatch(clearCart());
    });
    toast.success("Successfully Order")
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">

      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 gap-4"
            >

              {/* Left Section */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-green-600 font-bold">
                    {item.price} Rs
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">
                <button
                  onClick={() => dispatch(decreaseQty(item))}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <FaMinus />
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQty(item))}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Price */}
              <div className="font-bold text-lg">
                {item.price * item.quantity} Rs
              </div>

              {/* Delete */}
              <button
                onClick={() => dispatch(removeFromCart(item))}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <RiDeleteBinLine />
              </button>
            </div>
          ))}

        </div>

        {/* Summary Box */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-fit">

          <h3 className="text-xl font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between mb-2">
            <span>Total Items:</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
            <span>Total:</span>
            <span>{totalAmount} Rs</span>
          </div>

          <button
            onClick={handCheckout}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-black py-3 rounded-lg font-semibold transition"
          >
            Proceed to Checkout
          </button>

        </div>

      </div>
    </section>
  );
};

export default Cartpage;
