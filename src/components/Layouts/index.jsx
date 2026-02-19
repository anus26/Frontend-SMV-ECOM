import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../pages/Footer'


const Layouts = () => {

  return (
<>
<div className='bg-white h-full'>
  
    
 <Navbar/>
  <Footer/>
<div className=''>

<Outlet />

</div>
</div>
</>
  )
}

export default Layouts