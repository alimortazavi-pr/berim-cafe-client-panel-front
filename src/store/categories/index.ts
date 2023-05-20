import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { ICategoriesState } from "@/common/interfaces/categories.interface";

//Reducers
import reducers from "@/store/categories/reducers";

const initialState: ICategoriesState = {
  categories: [],
  selectedCategory: undefined,
};

export const categoriesReducer = createSlice({
  name: "categories",
  initialState,
  reducers,
});

export default categoriesReducer.reducer;
