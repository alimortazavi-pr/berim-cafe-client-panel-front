import { ISignUpForm } from "@/common/interfaces/auth.interface";
import { Input } from "@nextui-org/react";
import { FormikProps } from "formik";
import { FC } from "react";

const UserName: FC<{ formikProps: FormikProps<ISignUpForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="mb-2">
      <Input
        bordered
        width="100%"
        label="نام کاربری کافه"
        placeholder="مثلا: lamiz"
        status={touched.username && errors.username ? "error" : undefined}
        color={touched.username && errors.username ? "error" : undefined}
        helperColor={touched.username && errors.username ? "error" : undefined}
        helperText={
          touched.username && errors.username ? errors.username : undefined
        }
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.username}
        name="username"
      />
    </div>
  );
};

export default UserName;
