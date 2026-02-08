import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProducts, productAdd, updataProducts } from "../../services/productApi"
const initialState={
    loading:false,
    error:null,
    products:[]
}
// get
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
// add
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
// updata
export const updataProductAPI=createAsyncThunk(
  "product/update",
  async(data,{rejectWithValue})=>{
    try {
      return await updataProducts(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const deleteProductAPI=createAsyncThunk(
  "product/delete",
  async(id,{rejectWithValue})=>{
    try {
        await deleteProductAPI({id})
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
// delete

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
//   updata product
  .addCase(updataProductAPI.pending,(state)=>{
        state.loading=true;
    state.error=null;

  })
.addCase(updataProductAPI.fulfilled, (state, action) => {
  state.loading = false;

  state.products = state.products.map((item) =>
    item._id === action.payload.product._id
      ? action.payload.product
      : item
  );
})


   .addCase(updataProductAPI.rejected,(state,action)=>{
    state.loading=false
    state.error=action.payload
  })

//   deleteproduct
.addCase(deleteProductAPI.pending,(state)=>{
        state.loading=true;
    state.error=null;

  })
.addCase(deleteProductAPI.fulfilled, (state, action) => {
  state.loading = false;

  state.products = state.products.filter(
    (item) => item._id !== action.payload
  );



})


   .addCase(deleteProductAPI.rejected,(state,action)=>{
    state.loading=false
    state.error=action.payload
  })
    }
})
export default productSlice.reducer