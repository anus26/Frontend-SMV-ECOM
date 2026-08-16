import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useorder from "../../redux/hooks/useorder";
import useProduct from "../../redux/hooks/useProduct";
import { buygetThunk } from "../../redux/slices/buySlice";
import usebuy from "../../redux/hooks/usebuy";
import { getProducts } from "../../services/productApi";
import { orderThunk } from "../../redux/slices/orderSlice";
import { getslugproductApi } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";

const Buy = () => {
  const {id}=useParams()
  const  dispatch=useDispatch()
  const {products}=useProduct()

const {order}=useorder()
  const product = products.find((item) => item._id === id);
  const cartItems = useSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("");
const [orderData, setOrderData] = useState({
  paymentMethod: "",
});

const cartItem = cartItems.find(
  (item) => item._id === id
);

const quantity = cartItem?.quantity || 1;

const totalPrice = (product?.price || 0) * quantity;
  const {buy}=usebuy()
  const input=[
    {
      label:'JazzCash',
    name:'JazzCash'
    },
    {
            label:'EasyPaisa',
    name:'EasyPaisa'
    },
    {
      label:"Cash",
      name:"Cash"
    },
    {
      label:"Bank",
      name:"Bank"
    },
    {
      label:"Stripe",
      name:"Stripe"
    }
  ]
  const handelChange=(e)=>{
       setOrderData({
            ...orderData,
            [e.target.name]:e.target.value,

        })
  }
const handleSubmit = (e) => {
  e.preventDefault();

  if (!orderData.paymentMethod) {
    toast.error("Please select payment method");
    return;
  }

  if (!buy?._id) {
    toast.error("Buyer address not found");
    return;
  }

  if (!product?._id) {
    toast.error("Product not found");
    return;
  }

  const data = {
    paymentMethod: orderData.paymentMethod,

    buyerId: buy._id,

    items: [
      {
        productId: product._id,
        quantity: quantity, // ✅ Cart ki actual quantity
      },
    ],
  };

  console.log("ORDER DATA:", data);

  dispatch(orderThunk(data));
};
console.log("BUY OBJECT:", buy);

console.log("BUY DOCUMENT ID:", buy?._id);

console.log("BUY USER ID:", buy?.userId);
useEffect(() => {
  dispatch(buygetThunk());
  dispatch(getslugproductApi());
}, [dispatch]);
  return (
    <section className="max-w-3xl mx-auto p-5">
      <div className="bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-5">
          Select Payment Method
        </h1>
        <form  onSubmit={handleSubmit} className="space-y-4">


        <div className="space-y-4">
    {
  input.map((item) => (
    <label
      key={item.name}
      className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer"
    >
      <input
        type="radio"
        name="paymentMethod"
        value={item.name}
        checked={orderData.paymentMethod === item.name}
        onChange={handelChange}
      />

      <span>{item.label}</span>
    </label>
  ))
}

          
  

        </div>
<div className="mt-5">
  <p className="text-gray-600">
    Quantity: {quantity}
  </p>

  <h1 className="text-xl font-bold">
    Rs {totalPrice}
  </h1>
</div>
        <button type="submit"
          className="mt-6 w-full bg-green text-black py-3 rounded-lg"
        >
          Place Order
        </button>
        
        </form>

      </div>
    </section>
  );
};

export default Buy;