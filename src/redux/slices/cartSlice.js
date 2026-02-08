import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, productAdd } from "../../services/productApi";

const initialState={
    items: []   ,
    loading:false,
    error:null,
    product:[]
}


export const productApI=createAsyncThunk(
  "auth/get",
  async(data,{rejectWithValue})=>{
    try {
      return await getProducts(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const addProductAPI=createAsyncThunk(
  "auth/add",
  async(data,{rejectWithValue})=>{
    try {
      return await productAdd(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
  const cartSlice = createSlice({
    name: "cart",
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
      const item = state.items.find(item => item._id === product._id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
  extraReducers:(builder)=>{
    builder
  .addCase(productApI.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
  .addCase(productApI.fulfilled,(state,action)=>{
    state.loading=false
    state.product=action.payload.getproduct
    console.log("product",action.payload);
  })
  .addCase(productApI.rejected,(state,action)=>{
    state.loading=false
    state.error=action.payload
  })
  // get
  .addCase(addProductAPI.pending,(state)=>{
        state.loading=true;
    state.error=null;

  })
  .addCase(addProductAPI.fulfilled,(state,action)=>{
    state.loading=false
    state.product=action.payload.product
    console.log("product",action.payload);
  })
   .addCase(addProductAPI.rejected,(state,action)=>{
    state.loading=false
    state.error=action.payload
  })
},
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
