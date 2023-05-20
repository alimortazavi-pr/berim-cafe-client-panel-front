import { Button, FormElement, Input } from "@nextui-org/react";
import { ChangeEvent, FC, useState } from "react";

//Types
import {
  IEditProfileForm,
  ISingleWorkingHour,
} from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";
import { AddCircle, Trash } from "iconsax-react";
import { toast } from "react-toastify";
import convertToPersian from "num-to-persian";
import convertAPToEnglish from "ap-to-english";

const Phones: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, setFieldValue } = formikProps;

  //States
  const [isAddingPhone, setIsAddingPhone] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  //Functions
  function inputHandler(e: ChangeEvent<FormElement>) {
    if (!e.target.value) {
      setPhone(convertAPToEnglish(e.target.value.replace(/\,/g, "")));
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else {
      setPhone(convertAPToEnglish(e.target.value.replace(/\,/g, "")));
    }
  }

  function addPhone() {
    if (!phone) {
      toast.error("لطفا شماره تماس را وارد کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setFieldValue("phones", [...values.phones, phone]);
    setPhone("");
    setIsAddingPhone(false);
  }

  function removePhone(p: string) {
    setFieldValue("phones", [...values.phones.filter((phone) => p !== phone)]);
  }

  return (
    <div className="col-span-12 lg:col-span-6">
      <div
        className={`mb-[0.375rem] ${
          errors.phones && touched.phones ? "text-[#F31260]" : "text-black"
        } text-sm`}
      >
        <label htmlFor="phones">تلفن تماس</label>
      </div>
      <div className="w-full shadow-[0_0_0_2px_rgba(0,0,0,0.15)] hover:shadow-[0_0_0_2px_#000000] px-4 min-h-[2.5rem] rounded-xl duration-300 text-zinc-800 text-sm flex flex-col justify-center font-medium">
        {isAddingPhone ? (
          <div className="py-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 flex items-center gap-2">
                <Input
                  width="100%"
                  type="text"
                  id="phone"
                  placeholder="شماره تماس"
                  onChange={inputHandler}
                  value={phone}
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                ghost
                color={"error"}
                size={"xs"}
                className="w-6/12"
                onClick={() => setIsAddingPhone(false)}
              >
                لغو
              </Button>
              <Button
                color={"success"}
                size={"xs"}
                className="w-6/12"
                onClick={addPhone}
              >
                افزودن
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-1 h-[2.5rem] cursor-pointer"
            onClick={() => setIsAddingPhone(true)}
          >
            <span className="leading-none">افزودن شماره تماس</span>
            <AddCircle className="w-4 h-fit" />
          </div>
        )}
        {values.phones?.length > 0 ? (
          <ul className="border-t pt-3">
            {values.phones.map((phone, i) => (
              <li key={i} className="flex items-start gap-1">
                <div
                  className="cursor-pointer"
                  onClick={() => removePhone(phone)}
                >
                  <Trash className="w-4 h-fit text-rose-400" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="ml-0.5">
                    <span>{convertToPersian(i + 1)}.</span>
                  </div>
                  <div className="">
                    <span>{convertToPersian(phone)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {errors.phones && touched.phones ? (
        <div className="text-[#F31260] text-sm mt-0.5">
          <span>{errors.phones}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Phones;
