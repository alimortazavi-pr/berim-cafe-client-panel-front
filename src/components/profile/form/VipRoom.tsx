import { Switch, SwitchEvent } from "@nextui-org/react";
import { FC } from "react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";

const VipRoom: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, setFieldValue } = formikProps;

  //Functions
  function switchChangeHandler(e: SwitchEvent) {
    setFieldValue("hasVipRoom", e.target.checked);
  }

  return (
    <div className="col-span-12 lg:col-span-6 flex items-end gap-2">
      <div
        className={`${
          errors.hasVipRoom && touched.hasVipRoom
            ? "text-[#F31260]"
            : "text-black"
        } text-sm`}
      >
        <label htmlFor="hasVipRoom" className="leading-none">
          دارای اتاق VIP:
        </label>
      </div>
      <Switch
        color="primary"
        checked={values.hasVipRoom}
        onChange={switchChangeHandler}
        name="hasVipRoom"
      />
      {errors.hasVipRoom && touched.hasVipRoom ? (
        <div className="text-[#F31260] text-sm">
          <span>{errors.hasVipRoom}</span>
        </div>
      ) : null}
      {/* <Textarea
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
      /> */}
    </div>
  );
};

export default VipRoom;
