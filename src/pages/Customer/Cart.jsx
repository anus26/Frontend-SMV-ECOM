import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import useProduct from "../../redux/hooks/useProduct";
import Product from "./Product";
import toast from "react-hot-toast";

const Cart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useProduct();

  const addproduct = products.find((p) => p._id === id);

  const [mainImage, setMainImage] = useState(
    addproduct?.images?.[0]
  );

  const handleAddToCart = () => {
    dispatch(addToCart(addproduct));
    toast.success("Added to cart successfully");
  };

  if (!addproduct)
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg font-semibold text-gray-600">
          Product not found
        </p>
      </div>
    );

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Side - Images */}
          <div>
            <img
              src={mainImage}
              alt={addproduct.title}
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
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {addproduct.title}
            </h1>

            <p className="text-gray-600 mb-6">
              {addproduct.description}
            </p>

            <p className="text-2xl font-semibold text-green-600 mb-6">
              Rs {addproduct.price}
            </p>

            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md 
              hover:bg-green-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Product />
    </>
  );
};

export default Cart;