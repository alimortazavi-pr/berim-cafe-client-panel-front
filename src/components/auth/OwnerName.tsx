import { ISignUpForm } from "@/common/interfaces/auth.interface";
import { Input } from "@nextui-org/react";
import { FormikProps } from "formik";
import { FC } from "react";

const OwnerName: FC<{ formikProps: FormikProps<ISignUpForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="mb-2">
      <Input
        bordered
        width="100%"
        label="نام مدیریت کافه"
        placeholder="مثلا: علی مرتضوی"
        status={touched.ownerName && errors.ownerName ? "error" : undefined}
        color={touched.ownerName && errors.ownerName ? "error" : undefined}
        helperColor={
          touched.ownerName && errors.ownerName ? "error" : undefined
        }
        helperText={
          touched.ownerName && errors.ownerName ? errors.ownerName : undefined
        }
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.ownerName}
        name="ownerName"
      />
    </div>
  );
};

export default OwnerName;
