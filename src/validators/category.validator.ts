import * as yup from "yup";

export const createAndEditCategoryValidator = yup.object().shape({
  title: yup.string().required("لطفا عنوان دسته را وارد کنید"),
});
