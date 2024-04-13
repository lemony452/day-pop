import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import studyReducer from "./study/studySlice";
import modalReducer from "./modal/modalSlice";

export const store = () => {
  return configureStore({
    reducer: { user: userReducer, study: studyReducer, modal: modalReducer },
  });
};
