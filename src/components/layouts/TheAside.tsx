import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";
import { asideStatusSelector } from "@/store/layouts/selectors";
import { toggleAside } from "@/store/layouts/actions";
import { logOut } from "@/store/auth/actions";

//Tools
import { DarkLogoSvg } from "./TheSvgs";
import cafeLogo from "@/assets/images/cafe-logo.png";
import {
  CloseSquare,
  Gallery,
  Home,
  Layer,
  LogoutCurve,
  MenuBoard,
  Messages1,
  Reserve,
  Shop,
} from "iconsax-react";

const TheAside = () => {
  //Redux
  const dispatch = useAppDispatch();
  const profile = useAppSelector(cafeSelector);
  const asideStatus = useAppSelector(asideStatusSelector);

  //Next
  const router = useRouter();

  //Functions
  function toggleAsideFunc() {
    dispatch(toggleAside(!asideStatus));
  }

  async function logOutFunc() {
    await dispatch(logOut());
    router.push("/get-started");
  }

  return (
    <div
      className={`py-10 pr-6 pl-5 h-screen overflow-y-auto border-l border-r-zinc-200 min-w-[15rem] fixed top-0 lg:static bg-zinc-50 duration-500 z-50 ${
        asideStatus ? "right-0" : "-right-64"
      }`}
    >
      <div
        className="lg:hidden absolute top-2 left-2 text-zinc-800 hover:text-zinc-600 hover:scale-90 duration-300"
        onClick={toggleAsideFunc}
      >
        <CloseSquare className="w-6 h-6" />
      </div>
      <div className="w-full flex justify-center mb-14">
        <DarkLogoSvg className={"w-24 h-[75px]"} />
      </div>
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-[75px] h-[75px] border rounded-full border-zinc-800 mb-2">
          {profile?.logo ? (
            <Image
              src={`https://beim-cafe-panel.liara.run/${profile.logo}`}
              alt=""
              fill
              className="rounded-full object-cover object-center"
            />
          ) : (
            <Image
              src={cafeLogo}
              fill
              alt=""
              className="rounded-full object-cover object-center"
            />
          )}
        </div>
        <div className="font-semibold mb-1 text-lg">
          <span>{profile?.name}</span>
        </div>
        <Button
          size={"xs"}
          ghost
          color={"gradient"}
          onClick={() => router.push("/profile")}
        >
          ویرایش
        </Button>
      </div>
      <ul>
        <li className="w-full">
          <Link
            href={"/"}
            className={`flex items-center gap-2 p-4 rounded-xl w-full duration-300 text-zinc-900 hover:bg-zinc-100 ${
              router.pathname === "/" ? "bg-zinc-100" : "bg-white"
            }`}
          >
            <Home className="w-5 h-5 text-zinc-600" variant="Bold" />
            <span className="leading-none">داشبورد</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href={"/menu"}
            className={`flex items-center gap-2 p-4 rounded-xl w-full duration-300 text-zinc-900 hover:bg-zinc-100 ${
              router.pathname.includes("menu") ? "bg-zinc-100" : "bg-white"
            }`}
          >
            <MenuBoard className="w-5 h-5 text-zinc-600" variant="Bold" />
            <span className="leading-none">منو</span>
          </Link>
        </li>
        {/* <li className="w-full">
          <Link
            href={"/reservations"}
            className={`flex items-center gap-2 p-4 rounded-xl w-full duration-300 text-zinc-900 hover:bg-zinc-100 ${
              router.pathname.includes("reservations")
                ? "bg-zinc-100"
                : "bg-white"
            }`}
          >
            <Reserve className="w-5 h-5 text-zinc-600" variant="Bold" />
            <span className="leading-none">رزرو‌ ها</span>
          </Link>
        </li> */}
        <li className="w-full">
          <Link
            href={"/notifications"}
            className={`flex items-center gap-2 p-4 rounded-xl w-full duration-300 text-zinc-900 hover:bg-zinc-100 ${
              router.pathname.includes("notifications")
                ? "bg-zinc-100"
                : "bg-white"
            }`}
          >
            <Messages1 className="w-5 h-5 text-zinc-600" variant="Bold" />
            <span className="leading-none">اطلاع‌رسانی ها</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href={"/shop"}
            className={`flex items-center gap-2 p-4 rounded-xl w-full duration-300 text-zinc-900 hover:bg-zinc-100 ${
              router.pathname.includes("shop")
                ? "bg-zinc-100"
                : "bg-white"
            }`}
          >
            <Shop className="w-5 h-5 text-zinc-600" variant="Bold" />
            <span className="leading-none">خرید استند بارکد منو</span>
          </Link>
        </li>
        <li className="w-full cursor-pointer" onClick={logOutFunc}>
          <span
            className={`flex items-center gap-2 p-4 rounded-xl w-full duration-300 text-red-500 hover:bg-red-200 bg-white`}
          >
            <LogoutCurve className="w-5 h-5 text-red-500" variant="Bold" />
            <span className="leading-none">خروج</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TheAside;
