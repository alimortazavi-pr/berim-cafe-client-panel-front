export interface IAuthState {
  token: null | string;
  didTryAutoLogin: boolean;
  isAuth: boolean;
}

export interface ISignUpForm {
  ownerName: string;
  name: string;
  province: string;
  city: string;
  authMobile: string | number;
  code: string;
}

export interface ISignInForm {
  authMobile: string;
  code: string;
}

export interface IForgetCodeForm {
  authMobile: string;
}
