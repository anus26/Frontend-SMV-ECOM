import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.items);
  return (
  <>
  <section className=''>
    <div className='bg-dark  rounded shadow-md relative  '>
      <div className='flex justify-between  p-4 text-center  '>

    <h1 className='text-2xl font-semibold '>SMV-ECOM</h1>
    <div className='input mr-5 flex justify-center max-w-md relative w-[30%] items-center '>
  <input
    type="text"
    placeholder="Search products..."
    className="w-full rounded-full px-5 pr-12 py-2 text-sm outline-none border border-green
               focus:ring-2 focus:ring-green1"
  />
 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-greenDark text-xl cursor-pointer hover:text-green1 transition">
    <CiSearch />
  </span>
    </div>
     
      <Link to="/cart" className='flex'>
     <CiShoppingCart className='font-medium text-2xl' />({cartItems})
      </Link>
      </div>
    </div>
  </section>
  </>
  )
}

export default Navbar