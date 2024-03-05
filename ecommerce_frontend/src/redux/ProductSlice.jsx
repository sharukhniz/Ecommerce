import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
    "products/fetchProduct",
    async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        return response.data.products;
      } catch (error) {
        throw error;
      }
    }
  );
  
  export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (productData) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/products",
          productData
        );
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  );
  export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (productData) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/categories/${productData.id}`,
          productData
        );
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  );
  
  export const deleteProduct = createAsyncThunk(
    "produts/deleteProduct",
    async (productData) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/categories/${productData.id}`
        );
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  );


const productSlice = createSlice({
  name: "products",
  initialState: {
    categorys: [],
    status: "idle",
    error: null,
    showAddModal: false,
    showDeleteModal: false,
    selectedProductId: null,
  },
  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProduct.pending, (state) => {
    state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(
          (x) => x._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProductId, setShowAddModal, setShowDeleteModal } =
  productSlice.actions;

export default productSlice.reducer;
