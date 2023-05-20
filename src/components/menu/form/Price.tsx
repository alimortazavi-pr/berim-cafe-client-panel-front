import { FormElement, Input } from "@nextui-org/react";
import { ChangeEvent, FC } from "react";

//Types
import { IItemForm } from "@/common/interfaces/menu.interface";

//Tools
import { FormikProps } from "formik";
import convertAPToEnglish from "ap-to-english";
import priceGenerator from "price-generator";
import convertToPersian from "num-to-persian";

const Price: FC<{ formikProps: FormikProps<IItemForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  //Functions
  function inputHandler(e: ChangeEvent<FormElement>) {
    if (!e.target.value) {
      formikProps.setFieldValue(
        "price",
        convertToPersian(
          priceGenerator(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
        )
      );
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else {
      formikProps.setFieldValue(
        "price",
        convertToPersian(
          priceGenerator(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
        )
      );
    }
  }

  return (
    <div className="col-span-12">
      <Input
        bordered
        width="100%"
        label="قیمت آیتم (تومان)"
        placeholder="مثلا: ۱۳۰.۰۰۰"
        status={touched.price && errors.price ? "error" : undefined}
        color={touched.price && errors.price ? "error" : undefined}
        helperColor={touched.price && errors.price ? "error" : undefined}
        helperText={touched.price && errors.price ? errors.price : undefined}
        type="text"
        onBlur={handleBlur}
        onChange={inputHandler}
        value={values.price}
        name="price"
      />
    </div>
  );
};

export default Price;
