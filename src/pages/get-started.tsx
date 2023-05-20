import { useEffect, useState } from "react";
import Head from "next/head";

//Redux
import { useAppDispatch } from "@/store/hooks";

//Components
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import { getProvinces } from "@/store/layouts/actions";
import { LightLogoSvg } from "@/components/layouts/TheSvgs";

const GetStarted = () => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  //Effects
  useEffect(() => {
    getProvincesFunc();
  }, []);

  //Functions
  async function getProvincesFunc() {
    await dispatch(getProvinces());
  }

  return (
    <div>
      <Head>
        <title>بریم کافه | ثبت‌نام - ورود</title>
      </Head>
      <div className="min-h-screen mb-32 md:mb-40">
        <div className="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-[50vh] rounded-xl bg-[url('../images/auth-bg.jpg')]">
          <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
          <div className="container mx-auto z-10">
            <div className="flex flex-wrap justify-center -mx-3 mt-12">
              <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                <h1 className="mb-2 text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                  خوش آمدید!
                </h1>
                <p className="text-white px-2 md:text-xl lg:text-2xl">
                  شما می‌توانید با بریم کافه خیلی ساده منو آنلاین کافه خود را
                  بسازید و رزرو میز های کافه خود را مدیریت کنید
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap -mt-48 md:-mt-56 lg:-mt-48">
            <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
              <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border">
                <div className="flex items-center justify-center p-6 pb-0 gap-2">
                  <div
                    className={`flex-1 duration-500 border ${
                      isSignUp
                        ? "bg-amber-200 text-zinc-900 border-amber-200"
                        : "bg-white border-zinc-400 text-zinc-500"
                    } font-medium leading-none h-10 rounded-xl flex items-center justify-center cursor-pointer`}
                    onClick={() => setIsSignUp(true)}
                  >
                    <span className="">ثبت نام</span>
                  </div>
                  <div
                    className={`flex-1 duration-500 border ${
                      !isSignUp
                        ? "bg-amber-200 text-zinc-900 border-amber-200"
                        : "bg-white border-zinc-400 text-zinc-500"
                    } font-medium leading-none h-10 rounded-xl flex items-center justify-center cursor-pointer`}
                    onClick={() => setIsSignUp(false)}
                  >
                    <span>ورود</span>
                  </div>
                </div>
                <hr className="h-[1px] my-6 mx-6 bg-zinc-200" />
                <div className="flex-auto p-6 pt-0">
                  {isSignUp ? <SignUp /> : <SignIn />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
