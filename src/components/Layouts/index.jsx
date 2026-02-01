import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
<>
<div className='bg-gray'>
<Navbar/>

<Outlet />
</div>
</>
  )
}

export default Layouts