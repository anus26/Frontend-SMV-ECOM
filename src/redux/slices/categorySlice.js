import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addCategory, getCategory } from "../../services/categoryApi"

const initialState={
    categories:[],
    loading:false,
    error:null

}
export const thunkcategory=createAsyncThunk(
    "category/add",
    async(data,{rejectWithValue})=>{
        try {
            return await addCategory(data)

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
const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
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

           .addCase(getthunkcategory.pending,(state)=>{
            state.loading=true;
            state.error=null


    })

    },
})
export default categorySlice.reducer

        