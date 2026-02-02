import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Customer from './pages/Customer'
import Seller from './pages/Seller'
import Signup from './pages/signup'
import Signin from './pages/Signin'
import Product from './pages/Customer/Product'
import Cart from './pages/Customer/Cart'
import Layouts from './components/Layouts'

const Smvecom = () => {
  return (
<BrowserRouter>
<Routes >
    <Route path='Signin'  element={<Signin/>}/>
  <Route path='Signup'  element={<Signup/>}/>
  <Route path='/' element={
    <Layouts/>
  }>

  <Route index element={<Customer/>}/>
  <Route path='Admin' element={<Admin/>}/>
  <Route path='Seller' element={<Seller/>}/>
      <Route path="Product" element={<Product />} />
        <Route path="product/:id" element={<Cart />} />
  
  </Route>
</Routes>
</BrowserRouter>
  ) 
}

export default Smvecom