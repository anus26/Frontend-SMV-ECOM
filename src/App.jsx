import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Customer from './pages/Customer'
import Signup from './pages/signup'
import Signin from './pages/Signin'
import Product from './pages/Customer/Product'
import Cart from './pages/Customer/Cart'
import Layouts from './components/Layouts'
import ProtectedRoutes from './pages/routes/ProtectedRoutes'
import Seller from './pages/Seller'


const Smvecom = () => {
  
  return (
<BrowserRouter>
<Routes >
    <Route path='Signin'  element={<Signin/>}/>
  <Route path='Signup'  element={<Signup/>}/>
  <Route path='/' element={
    <Layouts/>
  }>

  <Route  element={<ProtectedRoutes allowedRole={["customer"]}/>}>
    <Route  index element={<Customer/>}/>
      <Route path="Product" element={<Product />} />
        <Route path="product/:id" element={<Cart />} />
  </Route>

 <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
        <Route path="Admin" element={<Admin />} />
      </Route>
 <Route element={<ProtectedRoutes allowedRoles={["seller"]} />}>
        <Route path="seller" element={<Seller/>} />
      </Route>
  
  </Route>
</Routes>
</BrowserRouter>
  ) 
}

export default Smvecom