import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  didTryAutoLoginSelector,
  isAuthSelector,
} from "@/store/auth/selectors";
import { autoLogin } from "@/store/auth/actions";

//Components
import TheAside from "./layouts/TheAside";

//Tools
import Cookies from "js-cookie";

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => {
  //Redux
  const dispatch = useAppDispatch();
  const didTryAutoLogin = useAppSelector(didTryAutoLoginSelector);
  const isAuth = useAppSelector(isAuthSelector);

  //Next
  const router = useRouter();

  //Effects
  useEffect(() => {
    autoLoginFunc();
  }, [dispatch, didTryAutoLogin]);

  //Functions
  async function autoLoginFunc() {
    if (router.pathname !== "/get-started") {
      const cafeAuthorization = Cookies.get("cafeAuthorization");
      if (cafeAuthorization && !didTryAutoLogin) {
        const transformedData = JSON.parse(cafeAuthorization);
        try {
          await dispatch(autoLogin(transformedData.token));
        } catch (err: any) {
          router.push("/get-started");
        }
      } else if (!cafeAuthorization) {
        router.push("/get-started");
      }
    }
  }

  return router.pathname !== "/get-started" ? (
    <div className="bg-[#fafafa] flex">
      <TheAside />
      <div className="py-3 px-3 lg:py-10 lg:px-6 w-full lg:max-w-[calc(100%-15rem)]">{children}</div>
    </div>
  ) : (
    <div className="">{children}</div>
  );
};

export default GlobalLayout;
