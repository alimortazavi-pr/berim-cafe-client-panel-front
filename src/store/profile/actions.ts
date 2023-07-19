import { AppThunk } from "@/store";

//Actions of other store
import { authenticate, saveDataToLocal } from "@/store/auth/actions";

//Reducer
import { profileReducer } from "@/store/profile";

//Actions from reducer
export const { setProfile } = profileReducer.actions;

//Interfaces
import {
  IChangeMobileForm,
  IEditProfileForm,
} from "@/common/interfaces/profile.interface";

//Tools
import api from "@/common/api";

//Actions from actions
export function getProfile(): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.get(`/cafes/profile`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.cafe));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function editProfile(form: IEditProfileForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/cafes/profile`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.cafe));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function uploadLogo(form: FormData): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/cafes/profile/upload-logo`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.cafe));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function uploadImage(form: FormData): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/cafes/profile/upload-image`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.cafe));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function removeImage(image: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(
          `/cafes/profile/delete-image`,
          { image: image },
          {
            headers: {
              Authorization: `Bearer ${getState().auth.token}`,
            },
          }
        );
        await dispatch(setProfile(res.data.cafe));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function changeMobile(form: IChangeMobileForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.put(`/cafes/profile/change-mobile`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setProfile(res.data.cafe));
        await dispatch(
          authenticate({
            token: res.data.token,
          })
        );
        saveDataToLocal(res.data.token);
      }
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}
