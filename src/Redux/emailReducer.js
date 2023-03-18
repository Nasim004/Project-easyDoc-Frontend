import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    change: (state, action) => {
      return action.payload;
    },
  },
});

export const { change } = emailSlice.actions;

export default emailSlice.reducer;
