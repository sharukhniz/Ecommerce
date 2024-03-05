import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";

const Store = configureStore({
  reducer: {
    categorys: categoryReducer,
  },
});
export default Store;
