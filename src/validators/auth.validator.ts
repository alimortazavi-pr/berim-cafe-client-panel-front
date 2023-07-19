import * as yup from "yup";

export const signUpValidator = yup.object().shape({
  ownerName: yup.string().required("لطفا نام مدیر کافه را وارد کنید"),
  username: yup.string().required("لطفا نام‌کاربری کافه را وارد کنید"),
  name: yup.string().required("لطفا نام کافه را وارد کنید"),
  province: yup.string().required("لطفا نام استان کافه را وارد کنید"),
  city: yup.string().required("لطفا شهر کافه را وارد کنید"),
  authMobile: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "فرمت شماره موبایل نادرست است")
    .max(11, "فرمت شماره موبایل نادرست است"),
  code: yup
    .string()
    .required("لطفا کد تایید را وارد کنید")
    .min(6, "کد تایید باید ۶ رقم باشد")
    .max(6, "کد تایید باید ۶ رقم باشد"),
});

export const signInValidator = yup.object().shape({
  authMobile: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "فرمت شماره موبایل نادرست است")
    .max(11, "فرمت شماره موبایل نادرست است"),
  code: yup
    .string()
    .required("لطفا کد تایید را وارد کنید")
    .min(6, "کد تایید باید ۶ رقم باشد")
    .max(6, "کد تایید باید ۶ رقم باشد"),
});
