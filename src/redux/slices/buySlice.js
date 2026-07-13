import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { buyadd, getbuy } from "../../services/buyApi";
import BuyNow from "../../pages/Customer/BuyNow";
import { FaGlasses } from "react-icons/fa6";

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
export const buygetThunk=createAsyncThunk(
    "buyer/getbuybyuser",
    async(_,{rejectWithValue})=>{
      try{
        const  response=await getbuy()
        return response
      }catch(error){
        return rejectWithValue(
          error.response?.data?.message||'Buy failed'
        )
      }
    }
)

const buySlice=createSlice({
    name:"buyer",
    initialState:{
      buy:null,
      loading:false,
      error:null
    },
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


        // get
        .addCase(buygetThunk.pending,(state)=>{
          state.loading=true
          state.error=null
        })
        .addCase(buygetThunk.fulfilled,(state,action)=>{
          state.loading=false
          state.buy=action.payload.buy
          console.log("buy",action.payload);
        })
        .addCase(buygetThunk.rejected,(state,action)=>{
          state.loading=false
          state.error=action.payload
        })
    }

})

export default buySlice.reducer;