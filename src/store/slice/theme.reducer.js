import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  isSubscriptionPopup: false,
  popupType: "",
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setSubscriptionPopup: (state, action) => {
      state.isSubscriptionPopup = action.payload.popup;
      state.popupType = action.payload.type;
    },
  },
});

export default themeReducer.reducer;
export const { setTheme, setSubscriptionPopup } = themeReducer.actions;
