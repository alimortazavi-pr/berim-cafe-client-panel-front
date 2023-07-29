import { Button, FormElement, Input, Loading } from "@nextui-org/react";
import { FormikProps } from "formik";
import { ChangeEvent, FC, useEffect, useState } from "react";

//Types
import { ISignInForm, ISignUpForm } from "@/common/interfaces/auth.interface";

//Redux
import { requestNewCode } from "@/store/auth/actions";
import { useAppDispatch } from "@/store/hooks";

//Tools
import { toast } from "react-toastify";
import convertAPToEnglish from "ap-to-english";
import convertToPersian from "num-to-persian";
import oneToTwoNumber from "one-to-two-num";

const CodeInput: FC<{
  formikProps: FormikProps<ISignUpForm> | FormikProps<ISignInForm>;
}> = ({ formikProps }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Fromik
  const { values, errors, touched, handleBlur, handleChange } = formikProps;

  //States
  const [counter, setCounter] = useState<{ value: number; status: boolean }>({
    value: 120,
    status: false,
  });
  const [currentMobile, setCurrentMobile] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Effects
  useEffect(() => {
    if (counter.status && values.authMobile !== currentMobile) {
      setCounter({ value: 120, status: false });
      window.clearInterval((window as any).counterInterval);
    }
  }, [values.authMobile]);

  //Functions
  function inputHandler(e: ChangeEvent<FormElement>) {
    if (!e.target.value) {
      formikProps.setFieldValue(
        "code",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else {
      formikProps.setFieldValue(
        "code",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    }
  }

  function calculatingCounter(time: number) {
    let count: number;
    count = time;
    (window as any).counterInterval = setInterval(() => {
      if (count !== 0) {
        count -= 1;
        setCounter({ status: true, value: count });
      } else {
        setCounter({ value: count, status: false });
        window.clearInterval((window as any).counterInterval);
      }
    }, 1000);
  }

  async function requestCode() {
    if (!formikProps.values.authMobile) {
      toast.error("لطفا ابتدا شماره موبایل خود را وارد کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    window.clearInterval((window as any).counterInterval);
    setIsLoading(true);
    try {
      setCurrentMobile(convertAPToEnglish(formikProps.values.authMobile));
      await dispatch(
        requestNewCode(convertAPToEnglish(formikProps.values.authMobile))
      );
      toast.success("کدتایید برای شما ارسال شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      calculatingCounter(120);
      setIsLoading(false);
    } catch (err: any) {
      calculatingCounter(counter.value);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="mb-2">
      <Input
        bordered
        width="100%"
        label="کدتایید"
        placeholder={
          counter.status
            ? "کدتایید ارسال شده را وارد کنید"
            : "لطفا برای درخواست کد تایید روی دکمه کلیک کنید"
        }
        status={touched.code && errors.code ? "error" : undefined}
        color={touched.code && errors.code ? "error" : undefined}
        helperColor={touched.code && errors.code ? "error" : undefined}
        helperText={touched.code && errors.code ? errors.code : undefined}
        type="text"
        onBlur={handleBlur}
        onChange={inputHandler}
        value={values.code}
        name="code"
        contentRightStyling={false}
        contentRight={
          counter.status ? (
            <div className="px-2 w-20 rounded-[0.75rem] h-[40px] bg-violet-100 flex justify-center items-center">
              <span className="text-sm font-semibold text-black">
                {convertToPersian(
                  oneToTwoNumber(Math.floor(counter.value / 60)) +
                    ":" +
                    oneToTwoNumber(Math.floor(counter.value % 60))
                )}
              </span>
            </div>
          ) : (
            <Button
              auto
              disabled={
                counter.status || isLoading || !formikProps.values.authMobile
              }
              onClick={requestCode}
              color="warning"
            >
              {isLoading ? (
                <Loading color="currentColor" size="sm" />
              ) : (
                "در خواست کد"
              )}
            </Button>
          )
        }
      />
    </div>
  );
};

export default CodeInput;
