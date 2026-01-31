import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
<>
<Navbar/>
<Outlet />
</>
  )
}

export default Layouts