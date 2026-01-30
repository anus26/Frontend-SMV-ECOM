import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Admin from './pages/Admin'
import Customer from './pages/Customer'
import Seller from './pages/Seller'
import Signup from './pages/signup'
import Signin from './pages/Signin'

const Smvecom = () => {
  return (
<BrowserRouter>
<Routes>
    <Route path='Signin'  element={<Signin/>}/>
  <Route path='Sigup'  element={<Signup/>}/>
  <Route index element={<Customer/>}/>
  <Route path='Admin' element={<Admin/>}/>
  <Route path='Seller' element={<Seller/>}/>
</Routes>
</BrowserRouter>
  ) 
}

export default Smvecom