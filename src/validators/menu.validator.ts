import * as yup from "yup";

export const createAndEditItemValidator = yup.object().shape({
  category: yup.string().required("لطفا دسته آیتم را انتخاب کنید"),
  title: yup.string().required("لطفا عنوان آیتم را وارد کنید"),
  price: yup.string().required("لطفا قیمت آیتم را وارد کنید"),
});
