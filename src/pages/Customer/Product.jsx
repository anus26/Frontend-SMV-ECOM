import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Customer/ProductCard";
import { useDispatch } from "react-redux";
import { getcategoryProductAPI, productApI } from "../../redux/slices/productSlice";
import useProduct from "../../redux/hooks/useProduct";
import { useParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";


const Product = () => {
  const dispatch=useDispatch()
  
  const {products,loading,error}=useProduct()

useEffect(()=>{

    dispatch(productApI());
 
},[dispatch])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
    <h1 className="text-xl  font-bold">Popular Products</h1>
   <div className="
  grid-cols-1 
  grid 
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
  gap-6
  m-8
">

  {products.map((item) => (
    <ProductCard key={item._id} item={item} />
  ))}
</div>

    </>
  );
};

export default Product;

