import { Button, Input, Loading, Modal } from "@nextui-org/react";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

//Types
import {
  nextUIModalProps,
  tailwindColorsType,
} from "@/common/types/layouts.type";
import { ICategoryForm } from "@/common/interfaces/categories.interface";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { editCategory, setSelectedCategory } from "@/store/categories/actions";
import { selectedCategorySelector } from "@/store/categories/selectors";
import { iconsSelector } from "@/store/layouts/selectors";
import { getIcons } from "@/store/layouts/actions";

//Validators
import { createAndEditCategoryValidator } from "@/validators/category.validator";

//Tools
import { toast } from "react-toastify";
import { Layer } from "iconsax-react";
import { Formik, FormikHelpers } from "formik";
import tailwindColorsList, {
  bgColorVariants,
} from "@/common/scripts/tailwindColorsList";
import Image from "next/image";

const EditCategoryModal: FC<nextUIModalProps> = ({ bindings, setVisible }) => {
  //Redux
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectedCategorySelector);
  const icons = useAppSelector(iconsSelector);

  //States
  const [initialCategoryFrom, setInitialCategoryFrom] = useState<ICategoryForm>(
    {
      title: "",
      color: "",
      icon: "",
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Effects
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getIcons());
      setInitialCategoryFrom({
        title: selectedCategory.title,
        color: selectedCategory.color,
        icon: selectedCategory.icon,
      });
    }
  }, [selectedCategory]);

  //Functions
  async function formSubmitHandler(values: ICategoryForm) {
    setIsLoading(true);
    try {
      await dispatch(editCategory(values, selectedCategory?._id as string));
      toast.success("دسته بندی با موفقیت ویرایش شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      setVisible(false);
      await dispatch(setSelectedCategory(undefined));
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  async function setFormColor(
    formikProps: FormikHelpers<ICategoryForm>,
    color: tailwindColorsType
  ) {
    formikProps.setFieldValue("color", color);
  }

  async function setFormIcon(
    formikProps: FormikHelpers<ICategoryForm>,
    icon: string
  ) {
    formikProps.setFieldValue("icon", icon);
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      animated={true}
      {...bindings}
      onClose={async () => {
        setVisible(false);
        await dispatch(setSelectedCategory(undefined));
      }}
      className="cursor-default"
    >
      <div className="flex items-center justify-center py-7 px-7">
        <Formik
          onSubmit={formSubmitHandler}
          initialValues={initialCategoryFrom}
          validationSchema={createAndEditCategoryValidator}
          enableReinitialize={true}
        >
          {(formikProps) => (
            <form
              onSubmit={formikProps.handleSubmit}
              className="grid grid-cols-12 gap-4 w-full"
            >
              <div className="col-span-12 text-right">
                <Input
                  bordered
                  width="100%"
                  label="عنوان دسته بندی"
                  placeholder="مثلا: نوشیدنی گرم"
                  status={
                    formikProps.touched.title && formikProps.errors.title
                      ? "error"
                      : undefined
                  }
                  color={
                    formikProps.touched.title && formikProps.errors.title
                      ? "error"
                      : undefined
                  }
                  helperColor={
                    formikProps.touched.title && formikProps.errors.title
                      ? "error"
                      : undefined
                  }
                  helperText={
                    formikProps.touched.title && formikProps.errors.title
                      ? formikProps.errors.title
                      : undefined
                  }
                  size="lg"
                  type="text"
                  onBlur={formikProps.handleBlur}
                  onChange={formikProps.handleChange}
                  value={formikProps.values.title}
                  name="title"
                />
              </div>
              <div className="col-span-12">
                <div className="text-right mb-1">
                  <span>انتخاب تم آیتم های دسته بندی</span>
                </div>
                <div className="flex items-center flex-wrap gap-1">
                  {tailwindColorsList.map((color, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 ${
                        bgColorVariants[color]
                      } rounded cursor-pointer ${
                        formikProps.values.color === color
                          ? "border-4 border-blue-600"
                          : ""
                      }`}
                      onClick={() => setFormColor(formikProps, color)}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="col-span-12">
                <div
                  className={`text-right mb-1 ${
                    formikProps.errors.icon && formikProps.touched.icon
                      ? "text-[#F31260]"
                      : "text-black"
                  }`}
                >
                  <span>انتخاب آیکون دسته بندی</span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-1">
                  {icons.map((icon, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded cursor-pointer relative ${
                        formikProps.values.icon === icon
                          ? "border-4 border-blue-600"
                          : ""
                      }`}
                      onClick={() => setFormIcon(formikProps, icon)}
                    >
                      <Image src={icon} fill alt="" className="rounded" />
                    </div>
                  ))}
                </div>
                {formikProps.errors.icon && formikProps.touched.icon ? (
                  <div className="text-[#F31260] text-sm mt-1 text-right">
                    <span>{formikProps.errors.icon}</span>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-center col-span-12">
                <Button
                  ghost
                  type="submit"
                  color="gradient"
                  size={"lg"}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    <span className="flex items-center gap-1 leading-none">
                      <Layer size="20" />
                      ویرایش
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
