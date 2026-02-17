import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layouts from "./components/Layouts";
import ProtectedRoutes from "./pages/routes/ProtectedRoutes";

import Signin from "./pages/Signin";
import Signup from "./pages/signup";

import Customer from "./pages/Customer";
import Product from "./pages/Customer/Product";
import Cart from "./pages/Customer/Cart";

import Admin from "./pages/Admin";
import ProductAdd from "./pages/Seller/ProductAdd";
import AddCategory from "./pages/Seller/AddCategory";
import ProductCard from "./components/Customer/ProductCard";
import Categorychild from "./pages/Customer/Categorychild";
import Cartpage from "./pages/Customer/Cartpage";
import Order from "./pages/Seller/order"
import Seller from "./pages/Seller/Seller";
import ProductGet from "./pages/Admin/ProductGet";
import { Toaster } from "react-hot-toast";

const Smvecom = () => {


  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

     
        <Route element={<Layouts />}>
          
          <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
            <Route path="admin" element={<Admin />} />
            <Route  path="productget" element={<ProductGet/>}/>
          </Route>
     
          <Route element={<ProtectedRoutes allowedRoles={["seller"]} />}>
          <Route path="seller" element={<Seller />} /> 
            <Route path="productadd" element={<ProductAdd/>}/>
            <Route path="addcategory" element={<AddCategory/>}/>
                    <Route path="getorder" element={<Order/>}/>
          </Route>
         <Route element={<ProtectedRoutes allowedRoles={["customer"]} />}>
    
    <Route index element={<Customer />} />
    <Route path="product/:id" element={<Cart/>} />
    <Route  path="category/:slug" element={<Categorychild/>}/>
    <Route path="cartpage" element={< Cartpage/>}/>

  </Route>
      


     

       

        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default Smvecom;
