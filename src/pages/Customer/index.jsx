import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Content from '../../components/customer/content'
import Product from './Product'
const Customer = () => {
  return (
<>
<section>
    <Navbar/>
    <Content/>
     <section className="p-8">
        <Product />
      </section>
</section>
</>
  )
}

export default Customer