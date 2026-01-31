import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartslice";

const Product = () => {
  const dispatch = useDispatch();

  const product = {
    id: 1,
    title: "Lenovo Laptop",
    price: 300,
    image: "/image/01.jpg",
  };

  return (
    <section>
      <div className="product m-16">

        <div className="bg-white rounded-2xl w-[300px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

          {/* Image + title → detail page */}
          <Link to="/product/1">
            <div className="bg-gray-100 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain p-2"
              />
            </div>

            <div className="p-4">
              <h1 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                1300 pcs available in stock
              </p>
            </div>
          </Link>

          {/* Price + Add to Cart */}
          <div className="flex justify-between items-center px-4 pb-4">
            <span className="text-green-600 font-bold text-lg">
              Rs {product.price}
            </span>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="px-4 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Product;
