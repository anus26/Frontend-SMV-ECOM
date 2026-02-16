import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden w-60">

      <Link to={`/product/${item._id}`}>

        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
          />

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
