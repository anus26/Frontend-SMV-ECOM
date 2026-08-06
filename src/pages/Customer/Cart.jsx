import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, increaseQty } from "../../redux/slices/cartSlice";
import useProduct from "../../redux/hooks/useProduct";
import Product from "./Product";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { products,loading } = useProduct();
  const cartItem = cartItems.find((item) => item._id === addproduct?._id);

  const totalAmount=cartItem.reduce(
    (total,item)=>total+item.price*item.quantity,
    0
  )

  console.log(products, loading);
  const navigate =useNavigate()

  const addproduct = products.find((p) => p._id === id);
  
  const [mainImage, setMainImage] = useState(
    
  );
  useEffect(()=>{
    if(addproduct){
      setMainImage(addproduct.images[0])
    }
  },[addproduct])
  
  const handleAddToCart = () => {
    dispatch(addToCart(addproduct));
    toast.success("Added to cart successfully");
  };
  if (loading)
    return (
  <div className="flex justify-center items-center h-60 ">
        <p className="text-lg font-semibold text-gray-600">
     Loading product details...
        </p>
      </div>
    );
    
    if (!addproduct)
      return (
    <div className="flex justify-center items-center h-60 ">
        <p className="text-lg font-semibold text-gray-600">
     Not Product Found...
        </p>
      </div>
    );

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8 ">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Side - Images */}
          <div>
            <img
              src={mainImage}
              // alt={addproduct}
              className="w-full h-[450px] object-cover rounded-xl shadow-md"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 mt-4 flex-wrap">
              {addproduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition 
                  ${
                    mainImage === img
                      ? "border-green-600"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="">
            <h1 className="text-3xl font-bold mb-4">
              {addproduct.title}
            </h1>

            <p className="text-gray-600 mb-6">
              {addproduct.description}
            </p>

            <p className="text-2xl font-semibold text-green-600 mb-6">
              Rs {addproduct.price}
            </p>
            <div className="flex gap-4">

               <button
          onClick={()=>navigate(`/BuyNow/${addproduct._id}`)}
              className="px-6 py-3 hover:bg-white text-white hover:text-black rounded-xl shadow-xl 
              bg-green transition duration-300"
              >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="px-6 py-3 hover:bg-green text-black rounded-xl shadow-xl
              transition duration-300"
              >
              Add to Cart
            </button>
              </div>
                       {/* Quantity Controls */}
                         {cartItem ? (
  <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">
    <button
      onClick={() => dispatch(decreaseQty(cartItem))}
      className="p-1 hover:bg-gray-200 rounded"
    >
      <FaMinus />
    </button>

    <span className="font-semibold">{cartItem.quantity}</span>

    <button
      onClick={() => dispatch(increaseQty(cartItem))}
      className="p-1 hover:bg-gray-200 rounded"
    >
      <FaPlus />
    </button>
  </div>
) : (
  <button
    onClick={handleAddToCart}
    className="px-6 py-3 hover:bg-green text-black rounded-xl shadow-xl transition duration-300"
  >
    Add to Cart
  </button>
)}
          </div>
        </div>
      </div>

    </>
  );
};

export default Cart;