import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupApi, SigninApi, getMe } from "../../services/authApi";

const initialState = {
  user: null,
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

// ✅ Signin thunk
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
export const getUser=createAsyncThunk(
    "auth/me",
    async(data,{rejectWithValue})=>{
        try {
            return await getMe(data)

        } catch (error) {
            return rejectWithValue(error.response?.data?.message||"Get user failed")
        }
    }
)

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
    state.user=action.payload.safeUser
    
    
    })
      .addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
},
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
