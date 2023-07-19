import { Button, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

//Types
import { ISignUpForm } from "@/common/interfaces/auth.interface";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { signUp } from "@/store/auth/actions";

//Components
import CafeName from "./CafeName";
import OwnerName from "./OwnerName";
import ProvincesSelect from "./ProvincesSelect";
import AuthMobile from "./AuthMobile";
import CodeInput from "./CodeInput";
import UserName from "./UserName";

//Validators
import { Formik } from "formik";
import { signUpValidator } from "@/validators/auth.validator";

//Tools
import { LoginCurve } from "iconsax-react";
import { toast } from "react-toastify";

const SignUp = () => {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //Formik
  const initialSignUpFrom: ISignUpForm = {
    ownerName: "",
    name: "",
    province: "",
    city: "",
    authMobile: "",
    username: "",
    code: "",
  };

  //States
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //functions
  async function formSubmitHandler(values: ISignUpForm) {
    setIsLoading(true);
    try {
      await dispatch(signUp(values));
      toast.success("ثبت نام شما با موفقیت انجام شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      router.push("/");
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <Formik
      onSubmit={formSubmitHandler}
      initialValues={initialSignUpFrom}
      validationSchema={signUpValidator}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <CafeName formikProps={formikProps} />
          <OwnerName formikProps={formikProps} />
          <ProvincesSelect formikProps={formikProps} />
          <UserName formikProps={formikProps} />
          <AuthMobile formikProps={formikProps} />
          <CodeInput formikProps={formikProps} />
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
              color="success"
              size={"lg"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading color="currentColor" size="sm" />
              ) : (
                <span className="flex items-center gap-1 font-bold">
                  <LoginCurve size="20" variant="Bold" />
                  ثبت نام
                </span>
              )}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignUp;
