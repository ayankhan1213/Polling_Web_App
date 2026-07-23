import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user:null
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    login: (state:any, action) => {
        state.user = action.payload
    },
    logout : (state)=>{
        state.user = null
    }
    
  },
});

export const { login , logout} = stateSlice.actions;
export default stateSlice.reducer;