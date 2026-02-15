import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { approveseller, blockseller, getuser, stats } from "../../services/adminApi";

const initialState = {
  users: [],
  stats: {},
  loading: false,
  error: null,
};


// 👥 Get All Users
export const getUsersThunk = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await getuser();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Get users failed");
    }
  }
);


// ✅ Approve Seller
export const approveSellerThunk = createAsyncThunk(
  "admin/approveSeller",
  async (id, { rejectWithValue }) => {
    try {
      return await approveseller(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Approve failed");
    }
  }
);


// 🚫 Block / Unblock User
export const blockUserThunk = createAsyncThunk(
  "admin/blockUser",
  async (id, { rejectWithValue }) => {
        console.log("API CALL ID:", id);
    try {
      return await blockseller(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Block failed");
    }
  }
);


// 📊 Get Stats
export const getStatsThunk = createAsyncThunk(
  "admin/getStats",
  async (_, { rejectWithValue }) => {
    try {
      return await stats();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Stats failed");
    }
  }
);


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ================= GET USERS =================
      .addCase(getUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        console.log("user",action.payload);
        
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ================= APPROVE SELLER =================
      .addCase(approveSellerThunk.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })


      // ================= BLOCK USER =================
      .addCase(blockUserThunk.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })


      // ================= GET STATS =================
      .addCase(getStatsThunk.fulfilled, (state, action) => {
        state.stats = action.payload;
        console.log("stats",action.payload);
        
      });
  },
});

export default adminSlice.reducer;
