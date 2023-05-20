import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { categoriesReducer } from "@/store/categories";

//Actions from reducer
export const { setCategories, setSelectedCategory } = categoriesReducer.actions;

//Interfaces
import { ICategoryForm } from "@/common/interfaces/categories.interface";

//Tools
import api from "@/common/api";

//Actions from actions
export function getCategories(): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.get(`/categories`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setCategories(res.data.categories));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function createCategory(form: ICategoryForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.post(`/categories`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(
          setCategories([
            ...getState().categories.categories,
            res.data.category,
          ])
        );
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function editCategory(
  form: ICategoryForm,
  categoryId: string
): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/categories/${categoryId}`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(
          setCategories(
            getState().categories.categories.map((category) =>
              category._id === categoryId ? res.data.category : category
            )
          )
        );
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function softDeleteCategory(categoryId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.delete(`/categories/${categoryId}/soft`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(
          setCategories(
            getState().categories.categories.filter(
              (category) => category._id !== categoryId
            )
          )
        );
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}
