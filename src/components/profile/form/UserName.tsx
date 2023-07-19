import { Input } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";

const UserName: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="col-span-12 lg:col-span-6">
      <Input
        bordered
        width="100%"
        label="نام کاربری کافه"
        placeholder="مثلا: lamiz"
        status={touched.username && errors.username ? "error" : undefined}
        color={touched.username && errors.username ? "error" : undefined}
        helperColor={
          touched.username && errors.username ? "error" : undefined
        }
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
