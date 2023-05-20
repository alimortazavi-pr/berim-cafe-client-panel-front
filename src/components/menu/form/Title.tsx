import { Input } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IItemForm } from "@/common/interfaces/menu.interface";

//Tools
import { FormikProps } from "formik";

const Title: FC<{ formikProps: FormikProps<IItemForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="col-span-12">
      <Input
        bordered
        width="100%"
        label="عنوان آیتم"
        placeholder="مثلا: لاته"
        status={touched.title && errors.title ? "error" : undefined}
        color={touched.title && errors.title ? "error" : undefined}
        helperColor={touched.title && errors.title ? "error" : undefined}
        helperText={touched.title && errors.title ? errors.title : undefined}
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.title}
        name="title"
      />
    </div>
  );
};

export default Title;
