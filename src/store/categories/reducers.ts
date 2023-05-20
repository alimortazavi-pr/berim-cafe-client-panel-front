import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import {
  ICategoriesState,
  ICategory,
} from "@/common/interfaces/categories.interface";

//Tools

const reducers = {
  setCategories: (
    state: ICategoriesState,
    action: PayloadAction<ICategory[]>
  ): ICategoriesState => {
    return {
      ...state,
      categories: [...action.payload],
    };
  },
  setSelectedCategory: (
    state: ICategoriesState,
    action: PayloadAction<ICategory | undefined>
  ): ICategoriesState => {
    return {
      ...state,
      selectedCategory: action.payload,
    };
  },
};

export default reducers;
