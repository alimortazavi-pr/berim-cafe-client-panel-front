import { AppThunk } from "@/store";

//Actions of other store
import { setProfile } from "@/store/profile/actions";

//Reducer
import { authReducer } from "@/store/auth";

//Actions from reducer
export const { authenticate, setDidTryAutoLogin, logOut } = authReducer.actions;

//Interfaces
import { ISignInForm, ISignUpForm } from "@/common/interfaces/auth.interface";

//Tools
import api from "@/common/api";
import Cookies from "js-cookie";

//Actions from actions
export function autoLogin(token: string): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await dispatch(
        authenticate({
          token: token,
        })
      );
      await dispatch(setProfile(res.data.cafe));
    } catch (err: any) {
      if (err.response?.status === 401) {
        dispatch(logOut());
      } else {
        console.log(err);
      }
    }
  };
}

export function requestNewCode(mobile: string): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/request-code", { mobile });
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

export function signUp(form: ISignUpForm): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/register", form);
      dispatch(
        authenticate({
          token: res.data.token,
        })
      );
      dispatch(setProfile(res.data.cafe));
      saveDataToLocal(res.data.token, res.data.cafe);
    } catch (err: any) {
      throw new Error(err.response.data?.message);
    }
  };
}

export function signIn(form: ISignInForm): AppThunk {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/login", form);
      dispatch(
        authenticate({
          token: res.data.token,
        })
      );
      dispatch(setProfile(res.data.cafe));
      saveDataToLocal(res.data.token, res.data.cafe);
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };
}

//Functions
export function saveDataToLocal(token: string, cafe: object) {
  Cookies.set(
    "cafeAuthorization",
    JSON.stringify({
      token: token,
      cafe: cafe,
    }),
    { expires: 90 }
  );
}
