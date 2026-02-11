import React from 'react'
import { useSelector } from 'react-redux'

const Cartpage = () => {
    const cartItems=useSelector(c)
  return (
    <>
    <section>
        <div>
           {cartitmes} 
        </div>
    </section>
    </>
  )
}

export default Cartpage