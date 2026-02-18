import React, { useEffect } from 'react'
import Product from './Product.jsx'
import Content from "../../components/Customer/Content.jsx";


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