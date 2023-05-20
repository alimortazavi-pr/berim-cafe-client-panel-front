import { Button, Loading, Modal } from "@nextui-org/react";
import React, { ChangeEvent, FC, useState } from "react";
import Image from "next/image";

//Types
import { nextUIModalProps } from "@/common/types/layouts.type";
import { IImagePreview } from "@/common/interfaces/layouts.interface";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";
import { uploadImage } from "@/store/profile/actions";

//Tools
import {
  Camera,
  CloseCircle,
  CloseSquare,
  DocumentUpload,
} from "iconsax-react";
import { toast } from "react-toastify";

const UploadImageModal: FC<nextUIModalProps> = ({ bindings, setVisible }) => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [imagePreview, setImagePreview] = useState<IImagePreview>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Functions
  function selectImg(e: ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.length !== 0) {
      const url = URL.createObjectURL(e.target?.files?.item(0) as File);
      setImagePreview({ url: url, file: e.target?.files?.item(0) as File });
    }
  }

  function destroyPic() {
    const fileInput: HTMLInputElement = document.getElementById(
      "image"
    ) as HTMLInputElement;
    fileInput.value = "";
    setImagePreview(undefined);
    setVisible(false);
  }

  async function uploadImageFunc() {
    if (!imagePreview?.file) {
      toast.error("لطفا تصویر موردنظر را انتخاب کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imagePreview?.file as File);
      await dispatch(uploadImage(formData));
      toast.success("تصویر باموفقیت آپلود شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setImagePreview(undefined);
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
      <div className="flex flex-col items-center py-8 px-5">
        <div className="w-full aspect-square rounded-2xl bg-zinc-100 relative mb-7">
          {imagePreview?.url ? (
            <Image
              src={imagePreview.url}
              alt=""
              fill
              className="rounded-2xl object-cover object-center"
            />
          ) : null}
          <label
            htmlFor="image"
            className="z-10 w-full h-full absolute bg-zinc-800/20 text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-300 rounded-2xl flex items-center justify-center cursor-pointer duration-300"
          >
            <Camera className="w-7 h-fit" />
          </label>
          <input
            type="file"
            className="hidden"
            id="image"
            onChange={selectImg}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            ghost
            auto
            type="submit"
            color="error"
            size={"lg"}
            className="w-full lg:w-6/12"
            onClick={destroyPic}
          >
            <span className="flex items-center gap-1 leading-none">
              <CloseSquare size="20" />
              لغو
            </span>
          </Button>
          <Button
            ghost
            auto
            type="submit"
            color="primary"
            size={"lg"}
            disabled={isLoading || !imagePreview?.file}
            className="w-full lg:w-6/12"
            onClick={uploadImageFunc}
          >
            {isLoading ? (
              <Loading color="currentColor" size="sm" />
            ) : (
              <span className="flex items-center gap-1 leading-none">
                <DocumentUpload size="20" />
                آپلود تصویر
              </span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadImageModal;
