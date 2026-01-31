import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [hover, setHover] = useState(false);
 
  return (
    <div className="  hover:shadow-xl transition">
      <Link to={`/product/${product.id}`}>
      <div className="border rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

        <img
         src={hover ? product.image[1] : product.image[0]}
          alt={product.title}
          className="w-full h-40 object-cover mb-2  "
        />
          </div>
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-green-600 font-bold">{product.price} Rs</p>
      </Link>
    </div>
  );
};

export default ProductCard;
