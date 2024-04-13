const { createSlice } = require("@reduxjs/toolkit");

const initailModalState = {
  isOpen: false,
  content: "",
};

const ModalSlice = createSlice({
  name: "modal",
  initialState: initailModalState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
