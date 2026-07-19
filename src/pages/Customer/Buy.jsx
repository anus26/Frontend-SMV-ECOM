import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import useorder from "../../redux/hooks/useorder";
import useProduct from "../../redux/hooks/useProduct";
import { buygetThunk } from "../../redux/slices/buySlice";
import usebuy from "../../redux/hooks/usebuy";
import { getProducts } from "../../services/productApi";
import { orderThunk } from "../../redux/slices/orderSlice";
import { getslugproductApi } from "../../redux/slices/productSlice";

const Buy = () => {
  const {id}=useParams()
  const  dispatch=useDispatch()
  const {products}=useProduct()
const {order}=useorder()
  const product = products.find((item) => item._id === id);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderData, setOrderData] = useState({
    paymentMethod: "",
   status: "pending",
   orderStatus: "Pending",
   items: [],
   totalAmount:""
 });
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

  const data = {
    ...orderData,
    totalAmount: product?.price,
    items: [
      {
        productId: product?._id,
        quantity: 1,
      },
    ],
  };

  dispatch(orderThunk(data));
  console.log("orderThunk", orderThunk);
  
};
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

          {/* <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
            <input
              type="radio"
              value="JazzCash"
              onChange={(e)=>setPaymentMethod(e.target.value)}
            />
            <span>JazzCash</span>
          </label>

          <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="EasyPaisa"
              onChange={(e)=>setPaymentMethod(e.target.value)}
              />
              <span>EasyPaisa</span>
              </label>

          <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Bank Transfer"
              onChange={(e)=>setPaymentMethod(e.target.value)}
            />
            <span>Bank Transfer</span>
          </label> */}

        </div>
<h1 className="text-xl font-bold">
  Rs {product?.price}
</h1>
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