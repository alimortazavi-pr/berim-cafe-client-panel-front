import { RootState } from "@/store/index";

//Interfaces
import { ICategory } from "@/common/interfaces/categories.interface";

export function categoriesSelector(state: RootState): ICategory[] {
  return state.categories.categories;
}

export function selectedCategorySelector(
  state: RootState
): ICategory | undefined {
  return state.categories.selectedCategory;
}
