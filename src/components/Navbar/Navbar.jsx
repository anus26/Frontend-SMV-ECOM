import React from 'react'
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
  return (
  <>
  <section>
    <div className='bg-green-100 m-5 rounded-full shadow-md   '>
      <div className='flex justify-between m-5 p-4 text-center  '>

    <h1 className='text-2xl font-semibold '>SMV-ECOM</h1>
    <div className='input mr-5 flex justify-center max-w-md relative w-[30%] items-center '>
  <input
    type="text"
    placeholder="Search products..."
    className="w-full rounded-full px-5 pr-12 py-2 text-sm outline-none border border-green-300
               focus:ring-2 focus:ring-green-400"
  />
 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-xl cursor-pointer hover:text-green-800 transition">
    <CiSearch />
  </span>
    </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default Navbar