import React, { useEffect } from "react";
import ProductCard from "../../components/Customer/ProductCard";
import { useDispatch } from "react-redux";
import usecart from "../../redux/hooks/usecart";
import { productApI } from "../../redux/slices/cartslice";


const Product = () => {
 
  const dispatch=useDispatch()
  const {product,loading,error}=usecart()

useEffect(()=>{
  dispatch(productApI())
},[dispatch])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex w-[50%]   gap-5 p-8 bord">
       {product?.map((item) => (
        <ProductCard key={item._id } item={item} />
      ))}
    </div>
  );
};

export default Product;

