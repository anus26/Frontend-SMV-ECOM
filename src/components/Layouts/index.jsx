import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
<>
<div className='bg-white h-full'>
<Navbar/>
<div className=''>

<Outlet />
</div>
</div>
</>
  )
}

export default Layouts