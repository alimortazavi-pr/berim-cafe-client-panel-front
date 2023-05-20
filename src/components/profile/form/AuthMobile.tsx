import { Input } from "@nextui-org/react";
import { FormikProps } from "formik";
import { FC } from "react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools

const AuthMobile: FC<{
  formikProps: FormikProps<IEditProfileForm>;
}> = ({ formikProps }) => {
  //Fromik
  const { values } = formikProps;

  //Functions

  return (
    <div className="col-span-12 lg:col-span-6">
      <Input
        bordered
        width="100%"
        label="شماره موبایل"
        placeholder="مثلا: ۰۹۱۲۱۲۳۴۵۶۷"
        type="text"
        value={values.authMobile}
        name="authMobile"
        disabled
      />
    </div>
  );
};

export default AuthMobile;
