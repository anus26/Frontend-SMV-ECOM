import React from 'react'

const Navbar = () => {
  return (
  <>
  <section>
    <div className='bg-green-100 m-5 rounded-full   '>
      <div className='flex justify-between m-5 p-4 text-center  '>

    <h1 className='text-2xl font-semibold '>SMV-ECOM</h1>
    <div className='input mr-5 flex justify-center w-'>
     <input type="text"  placeholder='search Products more' className='w-full rounded-lg '/>
    </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default Navbar