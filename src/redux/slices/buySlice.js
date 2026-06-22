import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { buyadd } from "../../services/buyApi";

const initialState={
buy:[],
loading:false,
error:null,

}
export const buyAddThunk = createAsyncThunk(
  "buyer/buy",
  async (data, { rejectWithValue }) => {
    try {
      const response = await buyadd(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Buy failed"
      );
    }
  }
);

const buySlice=createSlice({
    name:"buyer",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(buyAddThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
        
        })
        .addCase(buyAddThunk.fulfilled,(state,action)=>{
            state.loading=false;
            state.buy=action.payload;

        })
        .addCase(buyAddThunk.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})
export default buySlice.reducer;