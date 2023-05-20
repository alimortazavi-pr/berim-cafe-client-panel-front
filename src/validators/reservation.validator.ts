import * as yup from "yup";

export const createReservationValidator = yup.object().shape({
  from: yup.string().required("لطفا ساعت شروع رزرو را وارد کنید"),
  to: yup.string().required("لطفا ساعت پایان رزرو را وارد کنید"),
});
