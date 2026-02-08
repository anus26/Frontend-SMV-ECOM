import React, { useEffect } from "react";
import ProductCard from "../../components/Customer/ProductCard";
import { useDispatch } from "react-redux";
import { productApI } from "../../redux/slices/productSlice";
import useProduct from "../../redux/hooks/useProduct";


const Product = () => {
 
  const dispatch=useDispatch()
  const {products,loading,error}=useProduct()

useEffect(()=>{
  dispatch(productApI())
},[dispatch])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex w-[80%]   gap-5 p-8 bord">
       {products?.map((item) => (
        <ProductCard key={item._id } item={item} />
      ))}
    </div>
  );
};

export default Product;

