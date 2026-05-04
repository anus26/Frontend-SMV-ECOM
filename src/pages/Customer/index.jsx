import React, { useEffect } from 'react'
import Product from './Product.jsx'
import Content from "../../components/Customer/Content.jsx";
import FeaturedCategory from '../../components/Customer/FeaturedCategory.jsx';


const Customer = () => {
 
  return (
<>
     <section className=" w-full">

  <div className=' flex justify-center w-full '>

    <Content/>
  </div>
  <div>
    <FeaturedCategory/>
  </div>
    <div className='m-10'>
    
        <Product />

    </div>
      </section>
      

</>
  )
}

export default Customer