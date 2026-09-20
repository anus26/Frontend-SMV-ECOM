import React, { useEffect } from "react";
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
import { buygetThunk } from "../../redux/slices/buySlice";

import useAuth from "../../redux/hooks/useAuth";
import usebuy from "../../redux/hooks/usebuy";

import toast from "react-hot-toast";

import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const Cartpage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const { user } = useAuth();
  const { buy } = usebuy();

  const stripe = useStripe();
  const elements = useElements();

  // Get buyer/address data
  useEffect(() => {
    dispatch(buygetThunk());
  }, [dispatch]);

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  // Total quantity
  const totalQuantity = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  // Stripe checkout
  const handleCheckout = async () => {
    try {
      // Stripe check
      if (!stripe || !elements) {
        toast.error("Stripe is not ready");
        return;
      }

      // User check
      if (!user?._id) {
        toast.error("Please login first");
        return;
      }

      // Buyer address check
      if (!buy?._id) {
        toast.error("Please add your delivery address first");
        return;
      }

      // Cart check
      if (!cartItems.length) {
        toast.error("Your cart is empty");
        return;
      }

      // Get card element
      const card = elements.getElement(CardElement);

      if (!card) {
        toast.error("Please enter card details");
        return;
      }

      // Create order payload
      const orderData = {
        paymentMethod: "Stripe",

        buyerId: buy._id,

        items: cartItems.map((item) => ({
          productId: item._id,
          quantity: Number(item.quantity),
        })),
      };

      console.log("ORDER DATA:", orderData);

      // Create order
      const response = await dispatch(
        orderThunk(orderData)
      ).unwrap();

      console.log("ORDER RESPONSE:", response);

      // Get Stripe client secret
      const clientSecret = response?.clientSecret;

      if (!clientSecret) {
        toast.error("Stripe client secret not received");
        return;
      }

      // Confirm payment
      const { error, paymentIntent } =
        await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,

              billing_details: {
                name: user?.name || "",
                email: user?.email || "",
              },
            },
          }
        );

      // Stripe error
      if (error) {
        console.log("STRIPE ERROR:", error);

        toast.error(error.message || "Payment failed");
        return;
      }

      // Payment successful
      if (paymentIntent?.status === "succeeded") {
        toast.success(
          "Payment Successful & Order Placed!"
        );

        // Clear cart
        dispatch(clearCart());
      } else {
        toast.error(
          `Payment status: ${paymentIntent?.status}`
        );
      }

    } catch (error) {
      console.log("ORDER ERROR:", error);

      toast.error(
        error?.message ||
          error?.payload?.message ||
          "Order failed"
      );
    }
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] w-full">
        <FaShoppingBag className="text-6xl text-gray-400 mb-4" />

        <h1 className="text-2xl font-semibold text-gray-600">
          Your Cart is Empty
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        Shopping Cart
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ================= CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-4">

          {cartItems.map((item) => (

            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 gap-4"
            >

              {/* Product */}
              <div className="flex items-center gap-4 w-full sm:w-auto">

                {item.images &&
                  item.images.length > 0 && (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-green-600 font-bold">
                    {item.price} Rs
                  </p>
                </div>

              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">

                <button
                  type="button"
                  onClick={() =>
                    dispatch(decreaseQty(item))
                  }
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <FaMinus />
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    dispatch(increaseQty(item))
                  }
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <FaPlus />
                </button>

              </div>

              {/* Item total */}
              <div className="font-bold text-lg">
                {Number(item.price) *
                  Number(item.quantity)}{" "}
                Rs
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() =>
                  dispatch(removeFromCart(item))
                }
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <RiDeleteBinLine />
              </button>

            </div>
          ))}

        </div>

        {/* ================= PAYMENT BOX ================= */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-fit">

          <h3 className="text-xl font-semibold mb-4">
            Payment
          </h3>

          {/* Buyer address status */}
          <div className="mb-4 p-3 border rounded-lg">

            {buy?._id ? (
              <div>
                <p className="font-semibold text-green-600">
                  Delivery Address Added
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {buy?.FullName}
                </p>

                <p className="text-sm text-gray-600">
                  {buy?.Address}
                </p>

                <p className="text-sm text-gray-600">
                  {buy?.City}
                </p>
              </div>
            ) : (
              <p className="text-red-500">
                Delivery address not found
              </p>
            )}

          </div>

          {/* Stripe Card */}
          <div className="my-4 p-3 border rounded-lg">

            <CardElement
              options={{
                hidePostalCode: true,
              }}
            />

          </div>

          {/* Total Items */}
          <div className="flex justify-between mb-2">

            <span>
              Total Items:
            </span>

            <span>
              {totalQuantity}
            </span>

          </div>

          {/* Total */}
          <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">

            <span>
              Total:
            </span>

            <span>
              {totalAmount} Rs
            </span>

          </div>

          {/* Pay button */}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={!stripe || !buy?._id}
            className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
              !stripe || !buy?._id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-black"
            }`}
          >
            {!buy?._id
              ? "Add Address First"
              : "Pay Now"}
          </button>

        </div>

      </div>
    </section>
  );
};

export default Cartpage;