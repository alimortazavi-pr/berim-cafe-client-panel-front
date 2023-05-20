import { Textarea } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";

const About: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="col-span-12 lg:col-span-6">
      <Textarea
        bordered
        width="100%"
        label="درباره کافه"
        placeholder="مثلا: کافه لمیز دارای ۵ سال سابقه ..."
        status={touched.about && errors.about ? "error" : undefined}
        color={touched.about && errors.about ? "error" : undefined}
        helperColor={touched.about && errors.about ? "error" : undefined}
        helperText={touched.about && errors.about ? errors.about : undefined}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.about}
        name="about"
      />
    </div>
  );
};

export default About;
