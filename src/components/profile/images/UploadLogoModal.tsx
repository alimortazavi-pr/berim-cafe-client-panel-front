import { Button, Loading, Modal } from "@nextui-org/react";
import React, { ChangeEvent, FC, useState } from "react";
import Image from "next/image";

//Types
import { nextUIModalProps } from "@/common/types/layouts.type";
import { IImagePreview } from "@/common/interfaces/layouts.interface";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";
import { uploadLogo } from "@/store/profile/actions";

//Tools
import { Camera, CloseCircle, DocumentUpload } from "iconsax-react";
import { toast } from "react-toastify";

const UploadLogoModal: FC<nextUIModalProps> = ({ bindings, setVisible }) => {
  //Redux
  const dispatch = useAppDispatch();
  const profile = useAppSelector(cafeSelector);

  //States
  const [logoPreview, setLogoPreview] = useState<IImagePreview>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Functions
  function selectImg(e: ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.length !== 0) {
      const url = URL.createObjectURL(e.target?.files?.item(0) as File);
      setLogoPreview({ url: url, file: e.target?.files?.item(0) as File });
    }
  }

  function destroyPic() {
    const fileInput: HTMLInputElement = document.getElementById(
      "logo"
    ) as HTMLInputElement;
    fileInput.value = "";
    setLogoPreview(undefined);
  }

  async function uploadLogoFunc() {
    if (!logoPreview?.file) {
      toast.error("لطفا لوگو کافه خود را انتخاب کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("logo", logoPreview?.file as File);
      await dispatch(uploadLogo(formData));
      toast.success("پروفایل شما با موفقیت ویرایش شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLogoPreview(undefined);
      setIsLoading(false);
      setVisible(false);
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      animated={true}
      {...bindings}
      className="cursor-default"
    >
      <div className="flex flex-col items-center my-5 px-5">
        <div className="w-40 h-40 rounded-full bg-zinc-100 relative mb-7">
          {logoPreview?.url ? (
            <Image
              src={logoPreview.url}
              alt=""
              fill
              className="rounded-full object-cover object-center"
            />
          ) : profile?.logo ? (
            <Image
              src={`https://api-panel.berimcafe.org/${profile.logo}`}
              alt=""
              fill
              className="rounded-full object-cover object-center"
            />
          ) : null}
          {logoPreview?.url ? (
            <div
              className="bg-white absolute z-20 top-3 left-2 rounded-full"
              onClick={destroyPic}
            >
              <CloseCircle className="w-6 h-6 text-red-400 cursor-pointer" />
            </div>
          ) : null}
          <label
            htmlFor="logo"
            className="z-10 w-full h-full absolute bg-zinc-800/20 text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-300 rounded-full flex items-center justify-center cursor-pointer duration-300"
          >
            <Camera className="w-7 h-7" />
          </label>
          <input
            type="file"
            className="hidden"
            id="logo"
            onChange={selectImg}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <Button
          ghost
          type="submit"
          color="primary"
          size={"lg"}
          disabled={isLoading || !logoPreview?.file}
          className="w-full lg:w-6/12"
          onClick={uploadLogoFunc}
        >
          {isLoading ? (
            <Loading color="currentColor" size="sm" />
          ) : (
            <span className="flex items-center gap-1 leading-none">
              <DocumentUpload size="20" />
              آپلود عکس
            </span>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default UploadLogoModal;
