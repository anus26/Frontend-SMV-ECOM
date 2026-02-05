import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
    const [hover, setHover] = useState(false);
 
  return (
    <div className="  hover:shadow-xl bg-color1 h-72 rounded-md   transition">
      <Link to={`/product/${item._id}`}>
      <div className="  p-4  transition-all duration-300" >

        <img
         src={item.image}
          alt={item.title}
          className="w-full h-40  object-cover mb-2  "
        />
          </div>
        <h2 className="font-semibold">{item.title}</h2>
        <p className="text-greenDark font-bold">{item.price} Rs</p>
      </Link>
    </div>
  );
};


export default ProductCard;
                            