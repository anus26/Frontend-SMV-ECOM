import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ item }) => {
  return (
  <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden w-60">

  <Link to={`/product/${item._id}`}>


    <div className="relative h-48 overflow-hidden">

      {item.images && item.images.length > 0 && (
        <div className="relative w-full h-full group">

        
          <img
            src={item.images[0]}
            alt="product"
            className="absolute w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
          />

       
          {item.images[1] && (
            <img
              src={item.images[1]}
              alt="product-hover"
              className="absolute w-[80%] h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
            />
          )}

        </div>
      )}

  
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

   
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">
        <FaEye className="text-white text-xl bg-black/50 p-2 rounded-full hover:scale-110 transition" />
        <FaShoppingCart className="text-white text-xl bg-black/50 p-2 rounded-full hover:scale-110 transition" />
      </div>

    </div>


    <div className="p-4 space-y-1">
      <h2 className="font-semibold text-sm truncate group-hover:text-green-600 transition">
        {item.title}
      </h2>

      <p className="text-green-600 font-bold text-base">
        Rs {item.price}
      </p>
    </div>

  </Link>
</div>
  );
};

export default ProductCard;
