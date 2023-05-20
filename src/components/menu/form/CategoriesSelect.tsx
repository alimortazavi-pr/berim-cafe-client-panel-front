import { FormikProps } from "formik";
import { FC, useEffect, useState } from "react";

//Types
import { IItemForm } from "@/common/interfaces/menu.interface";
import { ICategory } from "@/common/interfaces/categories.interface";

//Redux
import { useAppSelector } from "@/store/hooks";
import { categoriesSelector } from "@/store/categories/selectors";

//Tools
import Select from "react-select";

const CategoriesSelect: FC<{ formikProps: FormikProps<IItemForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    formikProps;

  //Redux
  const categories = useAppSelector(categoriesSelector);

  //Functions
  function onChangeHandler(val: any) {
    setFieldValue("category", val._id);
  }

  return (
    <div className="col-span-12">
      <div
        className={`mb-[0.375rem] ${
          errors.category && touched.category ? "text-[#F31260]" : "text-black"
        } text-sm`}
      >
        <label>انتخاب دسته بندی</label>
      </div>
      <Select
        options={categories}
        onChange={onChangeHandler}
        placeholder="انتخاب دسته بندی"
        getOptionLabel={(option: ICategory) => option.title as string}
        getOptionValue={(option: ICategory) => option._id as string}
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        value={
          values.category
            ? categories.find((category) => category._id === values.category)
            : undefined
        }
      />
      {errors.category && touched.category ? (
        <div className="text-[#F31260] text-sm mt-0.5">
          <span>{errors.category}</span>
        </div>
      ) : null}
    </div>
  );
};

export default CategoriesSelect;
