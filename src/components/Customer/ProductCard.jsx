import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded shadow-md">
      <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
      <h2 className="font-semibold mt-2">{product.title}</h2>
      <p className="text-green-600 font-bold">{product.price} Rs</p>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
       Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
