import { FormikProps } from "formik";
import { FC, useEffect, useState } from "react";

//Types
import { ISignUpForm } from "@/common/interfaces/auth.interface";

//Redux
import { useAppSelector } from "@/store/hooks";
import { provincesSelector } from "@/store/layouts/selectors";

//Tools
import Select from "react-select";
import { ICity } from "@/common/interfaces/layouts.interface";

const ProvincesSelect: FC<{ formikProps: FormikProps<ISignUpForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    formikProps;

  //Redux
  const provinces = useAppSelector(provincesSelector);

  //States
  const [provincesOptions, setProvincesOptions] = useState<any[]>([]);

  //Effects
  useEffect(() => {
    setProvincesOptions(
      provinces.map((province) => ({
        ...province,
        options: province.cities,
      }))
    );
  }, [provinces]);

  //Functions
  function onChangeHandler(val: any) {
    setFieldValue("province", val.province_name);
    setFieldValue("city", val.name);
  }

  return (
    <div className="mb-2">
      <div
        className={`mb-[0.375rem] ${
          errors.city && touched.city ? "text-[#F31260]" : "text-black"
        } text-sm`}
      >
        <label htmlFor="provinces">انتخاب شهر</label>
      </div>
      <Select
        options={provincesOptions}
        onChange={onChangeHandler}
        getOptionLabel={(option: ICity) => option.name}
        formatGroupLabel={(data: any) => (
          <div>
            <span>{data.name}</span>
          </div>
        )}
        placeholder="انتخاب شهر"
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        value={
          values.city
            ? {
                name: values.city,
                province_name: values.province,
                latitude: /[\s\S]+/g as any,
                longitude: /[\s\S]+/g as any,
              }
            : undefined
        }
      />
      {errors.city && touched.city ? (
        <div className="text-[#F31260] text-sm mt-0.5">
          <span>{errors.city}</span>
        </div>
      ) : null}
    </div>
  );
};

export default ProvincesSelect;
