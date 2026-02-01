import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const products = [
  { id: 1, title: "Lenovo Laptop", price: 300,     image: ["/image/01.jpg", "/image/02.jpg"], description: "Lenovo laptop 16GB RAM, 512 SSD" },
  { id: 2, title: "Dell Laptop", price: 350,     image: ["/image/02.jpg", "/image/01.jpg"], description: "Dell Laptop 16GB RAM, 1TB SSD" },
];

const cart = () => {

  const { id } = useParams(); // URL se product id
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === parseInt(id));
const [mainImage,setMainImage]=useState(product.image[0])
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-8 flex gap-8   border  bg-white shadow-md  rounded-md  w-[50%] justify-center   m-8">
        <div>

      <img src={mainImage} alt={product.title} className="w-96 h-96 object-cover" />
      <div className="flex gap-4 mt-4">
      {product.image.map((img,index)=>(
        <img src={img} key={index} onClick={()=>setMainImage(img)} alt=""  className="w-24 h-24 object-cover border cursor-pointer hover:border-green-500" />
      ))}
      </div>
        </div>
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="mb-4">{product.description}</p>
        <p className="text-green-600 font-bold mb-4">{product.price} Rs</p>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="px-4 py-2 bg-greenDark text-white rounded hover:bg-green1"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default cart;
