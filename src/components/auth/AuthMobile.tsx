import { FormElement, Input } from "@nextui-org/react";
import { FormikProps } from "formik";
import { ChangeEvent, FC } from "react";

//Types
import { ISignInForm, ISignUpForm } from "@/common/interfaces/auth.interface";

//Tools
import convertAPToEnglish from "ap-to-english";
import convertToPersian from "num-to-persian";

const AuthMobile: FC<{
  formikProps: FormikProps<ISignUpForm> | FormikProps<ISignInForm>;
}> = ({ formikProps }) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  //Functions
  function inputHandler(e: ChangeEvent<FormElement>) {
    if (!e.target.value) {
      formikProps.setFieldValue(
        "authMobile",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else {
      formikProps.setFieldValue(
        "authMobile",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    }
  }

  return (
    <div className="mb-2">
      <Input
        bordered
        width="100%"
        label="شماره موبایل"
        placeholder="مثلا: ۰۹۱۲۱۲۳۴۵۶۷"
        status={touched.authMobile && errors.authMobile ? "error" : undefined}
        color={touched.authMobile && errors.authMobile ? "error" : undefined}
        helperColor={
          touched.authMobile && errors.authMobile ? "error" : undefined
        }
        helperText={
          touched.authMobile && errors.authMobile
            ? errors.authMobile
            : undefined
        }
        type="text"
        onBlur={handleBlur}
        onChange={inputHandler}
        value={values.authMobile}
        name="authMobile"
      />
    </div>
  );
};

export default AuthMobile;
