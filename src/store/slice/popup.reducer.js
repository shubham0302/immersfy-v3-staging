import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deletePopup: false,
  deleteId: "",
  deleteType: "",
};

const popupReducer = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setDeletePopup: (state, action) => {
      state.deletePopup = action.payload.popup;
      state.deleteType = action.payload.type;
      state.deleteId = action.payload.id;
    },
  },
});

export default popupReducer.reducer;
export const { setDeletePopup } = popupReducer.actions;
