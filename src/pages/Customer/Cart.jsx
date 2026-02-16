import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, decreaseQty, increaseQty } from "../../redux/slices/cartSlice";
import useProduct from "../../redux/hooks/useProduct";
import useCategory from "../../redux/hooks/useCategory";
import Product from "./Product";



const cart = () => {

  const { id } = useParams(); // URL se product id
  const dispatch = useDispatch();
  const {products}=useProduct()

 
  

  const addproduct = products.find((p) => p._id === id);
// const [mainImage,setMainImage]=useState(product.image[0)
  if (!addproduct) return <p>Product not found</p>;

  return (
    <>
    
    <div className="p-8 flex gap-8   border  bg-white shadow-md  rounded-md  w-[50%] justify-center text-center items-center  m-8">
        <div >

      {/* <img src={mainImage} alt={product.title} className="w-96 h-96 object-cover" /> */}
      <div className="flex gap-4 mt-4 border ">
      {/* {product.image.map((img,index)=>(
        <img src={img} key={index} onClick={()=>setMainImage(img)} alt=""  className="w-24 h-24 object-cover border cursor-pointer hover:border-green-500" />
      ))} */}
      <img src={addproduct.image} alt={products} />
      </div>
        </div>
      <div>
        <h1 className="text-2xl font-bold mb-2">{addproduct.title}</h1>
        <p className="mb-4">{addproduct.description}</p>
        <p className="text-green-600 font-bold mb-4">{addproduct.price} Rs</p>

        <button
          onClick={() => dispatch(addToCart(addproduct))}
          className="px-4 py-2 bg-greenDark text-white rounded-md hover:bg-green1  "
        >
          Add to Cart
        </button>
        
   
      </div>
      <div>

      </div>
    </div>
    <Product/>
    </>
   
  );
};

export default cart;
