import { Textarea } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";

const Address: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="col-span-12 lg:col-span-6">
      <Textarea
        bordered
        width="100%"
        label="آدرس کافه"
        placeholder="مثلا: میرداماد ..."
        status={touched.address && errors.address ? "error" : undefined}
        color={touched.address && errors.address ? "error" : undefined}
        helperColor={touched.address && errors.address ? "error" : undefined}
        helperText={
          touched.address && errors.address ? errors.address : undefined
        }
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.address}
        name="address"
      />
    </div>
  );
};

export default Address;
