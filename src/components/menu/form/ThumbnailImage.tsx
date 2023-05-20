import { ChangeEvent, FC, useState } from "react";

//Types
import { IItemForm } from "@/common/interfaces/menu.interface";
import { IImagePreview } from "@/common/interfaces/layouts.interface";

//Tools
import { FormikProps } from "formik";
import { Camera, CloseCircle } from "iconsax-react";
import Image from "next/image";

const ThumbnailImage: FC<{ formikProps: FormikProps<IItemForm> }> = ({
  formikProps,
}) => {
  //Fromik
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    formikProps;

  //States
  const [imagePreview, setImagePreview] = useState<IImagePreview>();

  //Functions
  function selectImg(e: ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.length !== 0) {
      const url = URL.createObjectURL(e.target?.files?.item(0) as File);
      setImagePreview({ url: url, file: e.target?.files?.item(0) as File });
      setFieldValue("thumbnailImage", e.target?.files?.item(0) as File);
    }
  }

  function destroyPic() {
    const fileInput: HTMLInputElement = document.getElementById(
      "thumbnailImage"
    ) as HTMLInputElement;
    fileInput.value = "";
    setFieldValue("thumbnailImage", "");
    setImagePreview(undefined);
  }

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col">
      <div
        className={`mb-[0.375rem] ${
          errors.thumbnailImage && touched.thumbnailImage
            ? "text-[#F31260]"
            : "text-black"
        } text-sm`}
      >
        <label>تصویر آیتم</label>
      </div>
      <div className="w-full min-h-[200px] flex-1 border rounded-2xl flex items-center justify-center relative">
        {imagePreview?.url ? (
          <Image
            src={imagePreview.url}
            alt=""
            fill
            className="rounded-2xl object-cover object-center"
          />
        ) : values?.thumbnailImage ? (
          <Image
            src={`http://localhost:7777/${values.thumbnailImage}`}
            alt=""
            fill
            className="rounded-2xl object-cover object-center"
          />
        ) : null}
        {imagePreview?.url ? (
          <div
            className="bg-white absolute z-20 top-3 left-2 rounded-2xl"
            onClick={destroyPic}
          >
            <CloseCircle className="w-6 h-fit text-red-400 cursor-pointer" />
          </div>
        ) : null}
        <label
          htmlFor="thumbnailImage"
          className="z-10 w-full h-full absolute bg-zinc-800/20 text-zinc-500 hover:bg-zinc-800/40 rounded-2xl hover:text-zinc-300 flex items-center justify-center cursor-pointer duration-300"
        >
          <Camera className="w-10 h-fit" />
        </label>
        <input
          type="file"
          className="hidden"
          id="thumbnailImage"
          onChange={selectImg}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
      {errors.thumbnailImage && touched.thumbnailImage ? (
        <div className="text-[#F31260] text-sm mt-0.5">
          <span>{errors.thumbnailImage}</span>
        </div>
      ) : null}
    </div>
  );
};

export default ThumbnailImage;
