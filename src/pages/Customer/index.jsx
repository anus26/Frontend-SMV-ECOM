import React, { useEffect } from 'react'
import Content from '../../components/customer/content.jsx'
import Product from './Product.jsx'

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