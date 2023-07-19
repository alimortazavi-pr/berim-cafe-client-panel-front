import { Input } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IItemForm } from "@/common/interfaces/menu.interface";

//Tools
import { FormikProps } from "formik";

const Description: FC<{ formikProps: FormikProps<IItemForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  return (
    <div className="col-span-12">
      <Input
        bordered
        width="100%"
        label="توضیحات کوتاه آیتم"
        placeholder="مثلا: ربوستا ۵۰٪"
        status={touched.description && errors.description ? "error" : undefined}
        color={touched.description && errors.description ? "error" : undefined}
        helperColor={
          touched.description && errors.description ? "error" : undefined
        }
        helperText={
          touched.description && errors.description
            ? errors.description
            : undefined
        }
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
        name="description"
      />
    </div>
  );
};

export default Description;
