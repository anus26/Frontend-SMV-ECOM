import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupApi, SigninApi, getMe, forgot, verify, resetpassword, resendotp } from "../../services/authApi";


const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  // jwt:localStorage.getItem("jwt"),
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
export const forgetPasswordThunk =createAsyncThunk(
  "auth/forgot",
async(data, {rejectWithValue})=>{
    try {
      return await  forgot(data)
    } catch (error) {
      return rejectWithValue(error.response?.data||"forgot failed")
    }
  })
export const verifyPasswordThunk=createAsyncThunk(
  "auth/verify",
  async(data,{rejectWithValue})=>{
    try {
      return await verify(data)
    } catch (error) {
      return rejectWithValue(error.response?.data||"verify failed")
    }
  }
)
export const resetPasswordThunk=createAsyncThunk(
  "auth/reset",
  async(data,{rejectWithValue})=>{
    try {
      return await resetpassword(data)
    } catch (error) {
      return rejectWithValue(error.response?.data||"reset password failed")
    }
  })
export const resendOtpThunk=createAsyncThunk(
  "auth/resendOtp",
  async(data,{rejectWithValue})=>{
    try {
      return await resendotp(data)
    } catch (error) {
      return rejectWithValue(error.response?.data||"resend otp failed")
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
        localStorage.setItem("jwt",action.payload.jwt)
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
               localStorage.setItem("jwt", action.payload.jwt);
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
    })
    // forgot password
.addCase(forgetPasswordThunk.pending, (state) => {
  state.loading = true;
})

.addCase(forgetPasswordThunk.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload.messages;
  state.email = action.meta.arg.email; // ✅ best
  localStorage.setItem("email",JSON.stringify(action.meta.arg.email))
})

.addCase(forgetPasswordThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
// verify password
.addCase(verifyPasswordThunk.pending,(state)=>{
  state.loading=true

})
.addCase(verifyPasswordThunk.fulfilled,(state,action)=>{
  state.loading=false
  state.message=action.payload.message
  state.otp=action.meta.arg.otp
  localStorage.setItem("otp",JSON.stringify(action.meta.arg.otp))
})
.addCase(verifyPasswordThunk.rejected,(state,action)=>{
  state.loading=false
  state.error=action.payload
})
// reset password
.addCase(resetPasswordThunk.pending,(state)=>{
  state.loading=true

})
.addCase(resetPasswordThunk.fulfilled,(state,action)=>{
  state.loading=false
  state.message=action.payload.message
})
.addCase(resetPasswordThunk.rejected,(state,action)=>{
  state.loading=false
  state.error=action.payload
})
// resend otp
.addCase(resendOtpThunk.pending,(state)=>{
  state.loading=true

})
.addCase(resendOtpThunk.fulfilled,(state,action)=>{
  state.loading=false
  state.messagesotp=action.payload.messagesotp
})
.addCase(resendOtpThunk.rejected,(state,action)=>{
  state.loading=false
  state.error=action.payload
})
  },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
