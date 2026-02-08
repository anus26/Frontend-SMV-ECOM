import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProducts, productAdd } from "../../services/productApi"
const initialState={
    loading:false,
    error:null,
    products:[]
}
export const productApI=createAsyncThunk(
  "product/get",
  async(data,{rejectWithValue})=>{
    try {
      return await getProducts(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const addProductAPI=createAsyncThunk(
  "product/add",
  async(data,{rejectWithValue})=>{
    try {
      return await productAdd(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
          .addCase(productApI.pending,(state)=>{
    state.loading=true;
    state.error=null;
  })
  .addCase(productApI.fulfilled,(state,action)=>{
    state.loading=false
    state.products=action.payload.getproduct
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
    state.products=action.payload.product
    console.log("product",action.payload);
  })
   .addCase(addProductAPI.rejected,(state,action)=>{
    state.loading=false
    state.error=action.payload
  })
    }
})
export default productSlice.reducer