import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
export const  store =configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        category:categoryReducer,
        product:productReducer
    }
})