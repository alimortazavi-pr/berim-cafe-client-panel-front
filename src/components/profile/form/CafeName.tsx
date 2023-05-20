import { Input } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";

const CafeName: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="col-span-12 lg:col-span-6">
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
