import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Content from '../../components/customer/content'
import Product from './Product'
import Categorychild from './Categorychild'
import { useDispatch, useSelector } from 'react-redux'
import useProduct from '../../redux/hooks/useProduct'
import { productApI } from '../../redux/slices/productSlice'
const Customer = () => {
 
  return (
<>
     <section className="">

  <div className=''>

    <Content/>
  </div>
    <div className='m-10'>
        <Product />

    </div>
      </section>
      

</>
  )
}

export default Customer