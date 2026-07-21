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
  },
});

export const { login } = stateSlice.actions;

export default stateSlice.reducer;