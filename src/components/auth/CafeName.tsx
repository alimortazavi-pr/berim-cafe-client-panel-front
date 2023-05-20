import { ISignUpForm } from "@/common/interfaces/auth.interface";
import { Input } from "@nextui-org/react";
import { FormikProps } from "formik";
import { FC } from "react";

const CafeName: FC<{ formikProps: FormikProps<ISignUpForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="mb-2">
      <Input
        bordered
        width="100%"
        label="نام کافه"
        placeholder="مثلا: لمیز"
        status={touched.name && errors.name ? "error" : undefined}
        color={touched.name && errors.name ? "error" : undefined}
        helperColor={touched.name && errors.name ? "error" : undefined}
        helperText={touched.name && errors.name ? errors.name : undefined}
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        name="name"
      />
    </div>
  );
};

export default CafeName;
