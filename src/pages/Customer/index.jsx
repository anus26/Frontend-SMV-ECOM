import React, { useEffect } from 'react'
import Product from './Product.jsx'
import Content from '../../components/customer/Content.jsx'

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