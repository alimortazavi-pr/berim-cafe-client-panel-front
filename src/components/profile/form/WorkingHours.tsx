import { Button, Input } from "@nextui-org/react";
import { FC, useState } from "react";

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

const WorkingHours: FC<{ formikProps: FormikProps<IEditProfileForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, setFieldValue } = formikProps;

  //States
  const [isAddingWH, setIsAddingWH] = useState<boolean>(false);
  const [workingHour, setWorkingHour] = useState<ISingleWorkingHour>({
    from: "",
    to: "",
  });

  //Functions
  function addWH() {
    if (!workingHour.from || !workingHour.to) {
      toast.error("لطفا ساعات را وارد کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setFieldValue("workingHours", [...values.workingHours, workingHour]);
    setWorkingHour({
      from: "",
      to: "",
    });
    setIsAddingWH(false);
  }

  function removeWH(WH: ISingleWorkingHour) {
    setFieldValue("workingHours", [
      ...values.workingHours.filter(
        (workingHour) =>
          WH.from !== workingHour.from && WH.to !== workingHour.to
      ),
    ]);
  }

  return (
    <div className="col-span-12 lg:col-span-6">
      <div
        className={`mb-[0.375rem] ${
          errors.workingHours && touched.workingHours
            ? "text-[#F31260]"
            : "text-black"
        } text-sm`}
      >
        <label htmlFor="workingHours">ساعات کاری</label>
      </div>
      <div className="w-full shadow-[0_0_0_2px_rgba(0,0,0,0.15)] hover:shadow-[0_0_0_2px_#000000] px-4 min-h-[2.5rem] rounded-xl duration-300 text-zinc-800 text-sm flex flex-col justify-center font-medium">
        {isAddingWH ? (
          <div className="py-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 flex items-center gap-2">
                <label htmlFor="from" className="text-base">
                  از
                </label>
                <Input
                  width="100%"
                  type="time"
                  id="from"
                  value={workingHour.from}
                  onChange={(e) =>
                    setWorkingHour({ ...workingHour, from: e.target.value })
                  }
                />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <label htmlFor="to" className="text-base">
                  تا
                </label>
                <Input
                  width="100%"
                  type="time"
                  id="to"
                  value={workingHour.to}
                  onChange={(e) =>
                    setWorkingHour({ ...workingHour, to: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                ghost
                color={"error"}
                size={"xs"}
                className="w-6/12"
                onClick={() => setIsAddingWH(false)}
              >
                لغو
              </Button>
              <Button
                color={"success"}
                size={"xs"}
                className="w-6/12"
                onClick={addWH}
              >
                افزودن
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-1 h-[2.5rem] cursor-pointer"
            onClick={() => setIsAddingWH(true)}
          >
            <span className="leading-none">افزودن ساعت کاری</span>
            <AddCircle className="w-4 h-fit" />
          </div>
        )}
        {values.workingHours?.length > 0 ? (
          <ul className="border-t pt-3">
            {values.workingHours.map((WH, i) => (
              <li key={i} className="flex items-start gap-1">
                <div className="cursor-pointer" onClick={() => removeWH(WH)}>
                  <Trash className="w-4 h-fit text-rose-400" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="ml-0.5">
                    <span>{convertToPersian(i + 1)}.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>از</span>
                    <span>{convertToPersian(WH.from)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>تا</span>
                    <span>{convertToPersian(WH.to)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {errors.workingHours && touched.workingHours ? (
        <div className="text-[#F31260] text-sm mt-0.5">
          <span>{errors.workingHours as string}</span>
        </div>
      ) : null}
    </div>
  );
};

export default WorkingHours;
