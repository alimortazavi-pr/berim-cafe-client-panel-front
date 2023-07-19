import * as yup from "yup";

export const editProfileValidator = yup.object().shape({
  ownerName: yup.string().required("لطفا نام مدیر کافه را وارد کنید"),
  username: yup
    .string()
    .required("لطفا نام‌کاربری کافه را وارد کنید")
    .matches(
      /^([a-z1-9_])+$/,
      "نام کابری باید از حروف انگلیسی یا اعداد و یا '_' باشد"
    ),
  name: yup.string().required("لطفا نام کافه را وارد کنید"),
  province: yup.string().required("لطفا نام استان کافه را وارد کنید"),
  city: yup.string().required("لطفا شهر کافه را وارد کنید"),
  workingHours: yup.array().min(1, "لطفا ساعات کاری کافه را وارد کنید"),
  phones: yup.array().min(1, "لطفا تلفن تماس کافه را وارد کنید"),
  address: yup.string().required("لطفا آدرس کافه را وارد کنید"),
  location: yup.array().min(2, "لطفا لوکیشن کافه را روی نقشه انتخاب کنید"),
});
