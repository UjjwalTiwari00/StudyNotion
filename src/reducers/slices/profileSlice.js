import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: (() => {
      const user = localStorage.getItem("user");
      try {
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return null;
      }
    })(),
  };

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
