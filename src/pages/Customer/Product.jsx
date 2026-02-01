import React from "react";
import ProductCard from "../../components/Customer/ProductCard";


const Product = () => {
  const products = [
    { id: 1, title: "Lenovo Laptop", price: 300, image: ["/image/01.jpg", "/image/02.jpg"]},
    { id: 2, title: "Dell Laptop", price: 350, image: ["/image/02.jpg","/image/01.jpg"] },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Product;

