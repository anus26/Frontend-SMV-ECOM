import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Content from '../../components/customer/content'
import Product from './Product'
import Categorychild from './Categorychild'
const Customer = () => {
  return (
<>
<section>
  <div className=''>

    <Content/>
  </div>
     <section className="p-8">
        <Product />
    
      </section>
        <br /><br />
</section>
</>
  )
}

export default Customer