import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupApi, SigninApi, getMe } from "../../services/authApi";
import { deleteProducts } from "../../services/productApi";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null,
};

// ✅ Signup thunk
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      return await SignupApi(data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);
// signin
export const signinUser = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      return await SigninApi(data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signin failed");
    }
  }
);
// get me
export const getUser=createAsyncThunk(
    "auth/me",
    async(data,{rejectWithValue})=>{
        try {
            return await getMe(data)

        } catch (error) {
            if (error.response?.status === 401) {
        localStorage.removeItem("user");
      }
            return rejectWithValue(error.response?.data?.message||"Get user failed")
        }
    }
)
export const logoutApiThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logout();
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
   initialState,

  
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.safeUser;
        localStorage.setItem("user",JSON.stringify(action.payload.safeUser))
        console.log("signup action",action.payload.safeUser);
        
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
// signin
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.safeUser;
            localStorage.setItem("user",JSON.stringify(action.payload.safeUser))
        console.log("signup action",action.payload);
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    //   getme
     .addCase(getUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUser.fulfilled,(state,action)=>{
    state.loading=false;
    state.user=action.payload.user
    console.log("get user",action.payload);
    
    
    
    })
      .addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // lougout
     .addCase(logoutApiThunk.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("user");
    });
},
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
