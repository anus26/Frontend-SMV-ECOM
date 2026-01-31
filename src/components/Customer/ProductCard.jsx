import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow-md hover:shadow-xl transition">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover mb-2"
        />
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-green-600 font-bold">{product.price} Rs</p>
      </Link>
    </div>
  );
};

export default ProductCard;
