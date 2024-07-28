import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = [];
const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const getUsers = () => {
  return async dispatch => {
    const blogs = await usersService.getAll();
    dispatch(setUsers(blogs));
  };
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
