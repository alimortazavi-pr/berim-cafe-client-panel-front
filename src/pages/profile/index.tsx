import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Loading, useModal } from "@nextui-org/react";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";
import { getProvinces } from "@/store/layouts/actions";
import { editProfile } from "@/store/profile/actions";

//Components
import NavBar from "@/components/layouts/NavBar";
import CafeName from "@/components/profile/form/CafeName";
import OwnerName from "@/components/profile/form/OwnerName";
import AuthMobile from "@/components/profile/form/AuthMobile";
import ProvincesSelect from "@/components/profile/form/ProvincesSelect";
import WorkingHours from "@/components/profile/form/WorkingHours";
import Phones from "@/components/profile/form/Phones";
import About from "@/components/profile/form/About";
import Address from "@/components/profile/form/Address";
import SelectLocation from "@/components/profile/form/SelectLocation";
import UploadLogoModal from "@/components/profile/images/UploadLogoModal";

//Validators
import { editProfileValidator } from "@/validators/profile.validator";

//Tools
import { Camera, UserTick } from "iconsax-react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import VipRoom from "@/components/profile/form/VipRoom";

const Profile = () => {
  //Redux
  const dispatch = useAppDispatch();
  const profile = useAppSelector(cafeSelector);

  //NextUI
  const { setVisible, bindings } = useModal();

  //States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialProfileFrom, setInitialProfileFrom] =
    useState<IEditProfileForm>({
      ownerName: "",
      name: "",
      authMobile: "",
      province: "",
      city: "",
      workingHours: [],
      phones: [],
      location: [],
      about: "",
      address: "",
      hasVipRoom: false,
      notification: false,
    });

  //Effects
  useEffect(() => {
    getProvincesFunc();
  }, []);

  useEffect(() => {
    setInitialProfileFrom({
      ownerName: profile?.ownerName || "",
      name: profile?.name || "",
      authMobile: profile?.authMobile || "",
      province: profile?.province || "",
      city: profile?.city || "",
      workingHours: profile?.workingHours || [],
      phones: profile?.phones || [],
      location: profile?.location || [],
      about: profile?.about || "",
      address: profile?.address || "",
      hasVipRoom: profile?.hasVipRoom || false,
      notification: profile?.notification || false,
    });
  }, [profile]);

  //Functions
  async function getProvincesFunc() {
    await dispatch(getProvinces());
  }

  async function formSubmitHandler(values: IEditProfileForm) {
    setIsLoading(true);
    try {
      await dispatch(editProfile(values));
      toast.success("پروفایل شما با موفقیت ویرایش شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>بریم کافه |‌ پروفایل کافه</title>
      </Head>
      <NavBar title="پروفایل کافه" />
      <div className="flex items-center justify-center">
        <div className="w-full lg:w-10/12 xl:w-7/12 bg-white rounded-3xl shadow py-10 px-4 lg:p-6">
          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-full bg-zinc-100 relative">
              {profile?.logo ? (
                <Image
                  src={`http://localhost:7777/${profile.logo}`}
                  alt=""
                  fill
                  className="rounded-full object-cover object-center"
                />
              ) : null}
              <div
                className="z-10 w-full h-full absolute bg-zinc-800/20 text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-300 rounded-full flex items-center justify-center cursor-pointer duration-300"
                onClick={() => setVisible(true)}
              >
                <Camera className="w-7 h-fit" />
              </div>
            </div>
          </div>
          <Formik
            onSubmit={formSubmitHandler}
            initialValues={initialProfileFrom}
            validationSchema={editProfileValidator}
            enableReinitialize={true}
          >
            {(formikProps) => (
              <form
                onSubmit={formikProps.handleSubmit}
                className="grid grid-cols-12 gap-4"
              >
                <CafeName formikProps={formikProps} />
                <OwnerName formikProps={formikProps} />
                <AuthMobile formikProps={formikProps} />
                <ProvincesSelect formikProps={formikProps} />
                <WorkingHours formikProps={formikProps} />
                <Phones formikProps={formikProps} />
                <Address formikProps={formikProps} />
                <About formikProps={formikProps} />
                <VipRoom formikProps={formikProps} />
                <SelectLocation formikProps={formikProps} />
                <div className="flex items-center justify-center col-span-12">
                  <Button
                    ghost
                    type="submit"
                    color="gradient"
                    size={"lg"}
                    disabled={isLoading}
                    className="w-full lg:w-6/12"
                  >
                    {isLoading ? (
                      <Loading color="currentColor" size="sm" />
                    ) : (
                      <span className="flex items-center gap-1 leading-none">
                        <UserTick size="20" />
                        تایید و ویرایش
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <UploadLogoModal bindings={bindings} setVisible={setVisible} />
    </div>
  );
};

export default Profile;
