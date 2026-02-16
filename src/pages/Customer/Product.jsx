import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Customer/ProductCard";
import { useDispatch } from "react-redux";
import { getcategoryProductAPI, productApI } from "../../redux/slices/productSlice";
import useProduct from "../../redux/hooks/useProduct";
import { useParams } from "react-router-dom";


const Product = () => {
  const dispatch=useDispatch()
  
  const {products,loading,error}=useProduct()

useEffect(()=>{

    dispatch(productApI());
 
},[dispatch])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
   <div className="
  grid 
  grid-cols-2 
  sm:grid-cols-3 
  md:grid-cols-4 
  lg:grid-cols-6 
  gap-4
">
  {products.map((item) => (
    <ProductCard key={item._id} item={item} />
  ))}
</div>

  );
};

export default Product;

