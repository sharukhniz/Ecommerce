import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductSlice"

const Store = configureStore({
  reducer: {
    categorys: categoryReducer,
    products: productReducer
  },
});
export default Store;
