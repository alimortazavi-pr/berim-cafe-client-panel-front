import { Button, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

//Types
import { ISignInForm } from "@/common/interfaces/auth.interface";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/auth/actions";

//Components
import AuthMobile from "./AuthMobile";
import CodeInput from "./CodeInput";

//Validators
import { Formik } from "formik";
import { signInValidator } from "@/validators/auth.validator";

//Tools
import { LoginCurve } from "iconsax-react";
import { toast } from "react-toastify";

const SignIn = () => {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //Formik
  const initialSignInFrom: ISignInForm = {
    authMobile: "",
    code: "",
  };

  //States
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //functions
  async function formSubmitHandler(values: ISignInForm) {
    setIsLoading(true);
    try {
      await dispatch(signIn(values));
      toast.success("باموفقیت وارد شدید", {
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
      initialValues={initialSignInFrom}
      validationSchema={signInValidator}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <AuthMobile formikProps={formikProps} />
          <CodeInput formikProps={formikProps} />
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
              color="gradient"
              size={"lg"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading color="currentColor" size="sm" />
              ) : (
                <span className="flex items-center gap-1 font-bold">
                  <LoginCurve size="20" variant="Bold" />
                  ورود
                </span>
              )}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignIn;
