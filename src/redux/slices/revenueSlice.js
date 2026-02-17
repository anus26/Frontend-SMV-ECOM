import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { revenuedaily, revenueget, revenuemonthly } from "../../services/revenueApi"


const initialState={
    total:{totalRevenue:0},
    loading:false,
    daily:[],
    monthly:[],
    error:null

}
// Total
export const revenuetotalThunk=createAsyncThunk(
    "revenue/get",
        async(data,{rejectWithValue})=>{
    try {
     return await revenueget(data)   
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||"revenue get")
    }
}
)
// Daily
export const revenuedailyThunk=createAsyncThunk(
    "revenue/daily",
        async(data,{rejectWithValue})=>{
    try {
     return await revenuedaily(data)   
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||"revenue daily")
    }
}
)
// Monthly
export const revenuemonthlyThunk=createAsyncThunk(
    "revenue/monthly",
        async(data,{rejectWithValue})=>{
    try {
     return await revenuemonthly(data)   
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||"revenue monthly")
    }
}
)

const revenueSlice=createSlice({
    name:"revenue",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // total
            .addCase(revenuetotalThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
          .addCase(revenuetotalThunk.fulfilled,(state,action)=>{
            state.loading=false
      state.total = action.payload
             console.log("revenue",action.payload);
             
          })
          .addCase(revenuetotalThunk.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
          })
        //   daily
           .addCase(revenuedailyThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
          .addCase(revenuedailyThunk.fulfilled,(state,action)=>{
            state.loading=false
      state.daily = action.payload
             console.log("revenue",action.payload);
             
          })
          .addCase(revenuedailyThunk.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
          })
        //   monthly
              .addCase(revenuemonthlyThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
          })
          .addCase(revenuemonthlyThunk.fulfilled,(state,action)=>{
            state.loading=false
      state.monthly = action.payload
      console.log(action.payload);
      
             
          })
          .addCase(revenuemonthlyThunk.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
          })
    }
    
})
export default revenueSlice.reducer
