import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addCategory, getCategory, getslugCategory } from "../../services/categoryApi"

const initialState={
    categories:[],
    loading:false,
    error:null

}
export const thunkcategory=createAsyncThunk(
    "category/add",
    async(data,{rejectWithValue})=>{
        try {
            const res= await addCategory(data)
              return res  
        }catch(error){
               return rejectWithValue(error.response?.data?.message || "category failed");
        }
    }
)
export const getthunkcategory=createAsyncThunk(
    "category/get",
    async(data,{rejectWithValue})=>{
            try {
            return await getCategory(data)

        }catch(error){
               return rejectWithValue(error.response?.data?.message || "category failed");
        }
    }
)
export const childCategory=createAsyncThunk(
    "category/getslug",
        async(data,{rejectWithValue})=>{
            try {
            return await getslugCategory(data)

        }catch(error){
               return rejectWithValue(error.response?.data?.message || "category failed");
        }
    }
)
const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // postcategory

    .addCase(thunkcategory.pending,(state)=>{
        state.loading=true;
        state.error=null
        
        
    })
    .addCase(thunkcategory.fulfilled,(state,action)=>{
        state.loading=false
        state.categories.push(action.payload.category)
        console.log("category",action.payload);
        
    })
    
    .addCase(thunkcategory.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    // getCategory

    .addCase(getthunkcategory.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
    .addCase(getthunkcategory.fulfilled,(state,action)=>{
        state.loading=false
        state.categories=action.payload.category
        console.log("category",action.payload);
        
    })
    
    .addCase(getthunkcategory.rejected,(state,action)=>{
     state.loading=false
     state.error=action.payload
 })
//  child
.addCase(childCategory.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
    .addCase(childCategory.fulfilled,(state,action)=>{
        state.loading=false
        state.categories=action.payload.categories
        console.log("category",action.payload);
        
    })
    
    .addCase(childCategory.rejected,(state,action)=>{
     state.loading=false
     state.error=action.payload
 })
    },
})
export default categorySlice.reducer

        