import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import revenueReducer from "./slices/revenueSlice"
import adminReducer from "./slices/adminSlice"
export const  store =configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        category:categoryReducer,
        product:productReducer,
        order:orderReducer,
        revenue:revenueReducer,
        admin:adminReducer
    }


})

store.subscribe(()=>{
    localStorage.setItem(
        "cartItems",
        JSON.stringify(store.getState().cart.items)
    )
})