import React from 'react'
import { Link } from 'react-router'

const Product = () => {
  return (
    <>
    <section>
      <div className="product m-16">
        <Link to="/Addtocart" >
  <div className="bg-white rounded-2xl w-[300px]  shadow-md hover:shadow-xl transition-all   duration-300 overflow-hidden">

    
    <div className=" bg-gray-100 flex items-center justify-center">
      <img
        src="/image/01.jpg"
        alt="Laptops Lenovo"
        className="h-full  object-contain p-2"
      />
    </div>

  
    <div className="p-4">
      <h1 className="text-lg font-semibold text-gray-800 truncate">
        Lenovo Laptop
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        1300 pcs available in stock
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 font-bold text-lg">
          Rs 300
        </span>

        {/* <button className="px-4 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600 transition">
          Add to Cart
        </button> */}
      </div>
    </div>

  </div>
          </Link>
</div>

    </section>
    </>
  )
}

export default Product