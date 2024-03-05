import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
  "contacts/fetchCategory",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      return response.data.categories;
    } catch (error) {
      throw error;
    }
  }
);

export const addCategory = createAsyncThunk(
  "contacts/addCategory",
  async (categoryData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/categories",
        categoryData
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export const updateCategory = createAsyncThunk(
  "contacts/updateCategory",
  async (categoryData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/categories/${categoryData.id}`,
        categoryData
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "contacts/deleteCategory",
  async (categoryData) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/categories/${categoryData.id}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);


const categorySlice = createSlice({
  name: "categorys",
  initialState: {
    categorys: [],
    status: "idle",
    error: null,
    showAddModal: false,
    showDeleteModal: false,
    selectedCategoryId: null,
  },
  reducers: {
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categorys = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.categorys.findIndex(
          (x) => x._id === action.payload._id
        );
        if (index !== -1) {
          state.categorys[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategoryId, setShowAddModal, setShowDeleteModal } =
  categorySlice.actions;

export default categorySlice.reducer;
