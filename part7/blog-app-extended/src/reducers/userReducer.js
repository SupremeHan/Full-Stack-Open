import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state, action) {
      return { userData: action.payload };
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { storeUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
