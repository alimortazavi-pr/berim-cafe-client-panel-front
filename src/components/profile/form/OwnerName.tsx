import { Input } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";

const OwnerName: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="col-span-12 lg:col-span-6">
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
