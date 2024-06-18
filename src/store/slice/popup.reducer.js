import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deletePopup: false,
  deleteId: "",
  deleteType: "",
  editTitlePopup: false,
  editTitleId: "",
  editTitleType: "",
  editTitleValue: "",
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
    setEditTitlePopup: (state, action) => {
      state.editTitlePopup = action.payload.popup;
      state.editTitleType = action.payload.type;
      state.editTitleId = action.payload.id;
      state.editTitleValue = action.payload.title;
    },
  },
});

export default popupReducer.reducer;
export const { setDeletePopup, setEditTitlePopup } = popupReducer.actions;
