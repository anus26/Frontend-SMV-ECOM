import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderAdd } from "../../services/orderApi";

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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    order: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        console.log("order", action.payload);
        
      })
      .addCase(orderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;

