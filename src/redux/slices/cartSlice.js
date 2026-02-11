import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";import { getProducts, productAdd } from "../../services/productApi";

const initialState={
    items: []   ,
    loading:false,
    error:null,
    items:JSON.parse(localStorage.getItem("cartItems"))||[]
    
}




const cartSlice = createSlice({
  name: "cart",
  clearCart: (state) => {
    state.items = [];
  },
    initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item._id === product._id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },

    increaseQty: (state, action) => {
       const product = action.payload;
      const item = state.items.find(item => item._id ===product._id);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      // const product=action.payload
      const item = state.items.find(item => item._id === action.payload._id);
      if (item && item.quantity > 1) item.quantity -= 1;
      else{

        state.items.filter(item=>item._id!==action.payload._id)
      }
    },
  },
  extraReducers:(builder)=>{
    builder
},
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
