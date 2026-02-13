import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allorder, orderAdd, orderdelete, orderupdata } from "../../services/orderApi";

const   initialState= {
    loading: false,
    error: null,
    orders: [],
  }
export const orderThunk = createAsyncThunk(
  "order/create",
  async (data, { rejectWithValue }) => {
    try {
      return await orderAdd(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Order failed"
      );
    }
  }
);
export const ordergetThunk = createAsyncThunk(
  "order/getAll",
  async (data, { rejectWithValue }) => {
    try {
      return await allorder(data);
    } catch (error) {
 
           return rejectWithValue(error.message)
    }
  }
);
export const orderupdataThunk = createAsyncThunk(
  "order/updata",
  async ({id,status}, { rejectWithValue }) => {
    try {
      return await orderupdata({id,status});
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Order failed"
      );
    }
  }
)
export const orderdeleteThunk=createAsyncThunk(
    "order/delete",
    async (id,{rejectWithValue})=>{

        try {
             await orderdelete(id)
             return id
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message||"delete failed"
            )
        }
    }
)


const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
// add
      .addCase(orderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.order;
        console.log("order", action.payload);
        
      })
      .addCase(orderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
// get
       .addCase(ordergetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  
      .addCase(ordergetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.allorders;
        console.log("allorders", action.payload);
        
      })
      .addCase(ordergetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   updata
           .addCase(orderupdataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  
      .addCase(orderupdataThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log("allorders", action.payload);
        state.orders = state.orders.map((order)=>
            order._id===action.payload.orderupdatas._id
        ?action.payload.orderupdatas
        :order
        )
        
      })
      .addCase(orderupdataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   delete
               .addCase(orderdeleteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(orderdeleteThunk.fulfilled,(state,action)=>{
    state.loading=false;
    // console.log("order delete",action.payload);
    
    state.orders=state.orders.filter((order)=>
        order._id!==action.payload
    
    )
})

       .addCase(orderdeleteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },

})

export default orderSlice.reducer;

