import { Button, Input, Loading, Modal } from "@nextui-org/react";
import React, { ChangeEvent, FC, useState } from "react";

//Types
import { nextUIModalProps } from "@/common/types/layouts.type";
import { ICategoryForm } from "@/common/interfaces/categories.interface";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { createCategory } from "@/store/categories/actions";

//Validators
import { createAndEditCategoryValidator } from "@/validators/category.validator";

//Tools
import { toast } from "react-toastify";
import { Layer } from "iconsax-react";
import { Formik } from "formik";

const CreateCategoryModal: FC<nextUIModalProps> = ({
  bindings,
  setVisible,
}) => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [initialCategoryFrom, setInitialCategoryFrom] = useState<ICategoryForm>(
    {
      title: "",
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Functions
  async function formSubmitHandler(values: ICategoryForm) {
    setIsLoading(true);
    try {
      await dispatch(createCategory(values));
      toast.success("دسته بندی با موفقیت ایجاد شد", {
        position: toast.POSITION.TOP_CENTER,
      });
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
                      ایجاد
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

export default CreateCategoryModal;
