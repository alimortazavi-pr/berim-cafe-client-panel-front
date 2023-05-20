import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { menuReducer } from "@/store/menu";

//Actions from reducer
export const { setItems } = menuReducer.actions;

//Interfaces
import { IItem, IItemForm } from "@/common/interfaces/menu.interface";

//Tools
import api from "@/common/api";

//Actions from actions
export function getAllItemsOfMenu(): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.get(`/menu/items`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setItems(res.data.items));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function getItemsOfCategory(categoryId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.get(`/menu/items-of-category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setItems(res.data.items));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function createItem(form: FormData): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.post(`/menu/items`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setItems([...getState().menu.items, res.data.item]));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function editItem(form: FormData, itemId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/menu/items/${itemId}`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(
          setItems(
            getState().menu.items.map((item) =>
              item._id === itemId ? res.data.item : item
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

export function softDeleteItem(itemId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.delete(`/menu/items/${itemId}/soft`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(
          setItems(getState().menu.items.filter((item) => item._id !== itemId))
        );
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}
