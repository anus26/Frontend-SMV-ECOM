import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden w-60">

      <Link to={`/product/${item._id}`}>

        {/* Image Section */}
        <div className="relative overflow-hidden">
     {item.images && item.images.length > 0 && (
  <div className="relative w-20 h-36 md:w-20 object-cover md:h-20 group overflow-hidden rounded-lg">
    
    {/* First Image (Default) */}
    <img
      src={item.images[0]}
      alt="product"
      className="absolute w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
    />

    {/* Second Image (On Hover) */}
    {item.images[1] && (
      <img
        src={item.images[1]}
        alt="product-hover"
        className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    )}
    
  </div>
)}

          {/* Hover Icons */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition duration-300">
            <FaEye className="text-white text-xl cursor-pointer hover:scale-110 transition" />
            <FaShoppingCart className="text-white text-xl cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h2 className="font-semibold text-sm truncate">{item.title}</h2>
          <p className="text-green-600 font-bold mt-1">{item.price} Rs</p>
        </div>

      </Link>
    </div>
  );
};

export default ProductCard;
