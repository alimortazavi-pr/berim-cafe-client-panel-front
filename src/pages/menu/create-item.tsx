import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { isAuthSelector } from "@/store/auth/selectors";

//Types
import { IItemForm } from "@/common/interfaces/menu.interface";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createItem } from "@/store/menu/actions";
import { getCategories } from "@/store/categories/actions";

//Components
import NavBar from "@/components/layouts/NavBar";
import Title from "@/components/menu/form/Title";
import Price from "@/components/menu/form/Price";
import CategoriesSelect from "@/components/menu/form/CategoriesSelect";
import ChooseThumbnail from "@/components/menu/form/ThumbnailImage";

//Validators
import { createAndEditItemValidator } from "@/validators/menu.validator";

//Tools
import { Formik } from "formik";
import { MenuBoard } from "iconsax-react";
import { toast } from "react-toastify";
import convertAPToEnglish from "ap-to-english";

const CreateItem = () => {
  //Redux
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);

  //Next
  const router = useRouter();

  //States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialItemFrom, setInitialItemFrom] = useState<IItemForm>({
    title: "",
    category: "",
    price: "",
    thumbnailImage: "",
  });

  //Effects
  useEffect(() => {
    getCategoriesFunc();
  }, [isAuth]);

  //Functions
  async function getCategoriesFunc() {
    await dispatch(getCategories());
  }

  async function formSubmitHandler(values: IItemForm) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append(
        "price",
        convertAPToEnglish(values.price.replace(/\,/g, ""))
      );
      formData.append("thumbnailImage", values.thumbnailImage);
      await dispatch(createItem(formData));
      toast.success("آیتم با موفقیت ایجاد شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      router.push("/menu");
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
        <title>بریم کافه |‌ ایجاد آیتم</title>
      </Head>
      <NavBar title="ایجاد آیتم" />
      <div className="flex items-center justify-center">
        <div className="w-full lg:w-10/12 xl:w-7/12 bg-white rounded-3xl shadow py-10 px-4 lg:p-6">
          <Formik
            onSubmit={formSubmitHandler}
            initialValues={initialItemFrom}
            validationSchema={createAndEditItemValidator}
            enableReinitialize={true}
          >
            {(formikProps) => (
              <form
                onSubmit={formikProps.handleSubmit}
                className="grid grid-cols-12 gap-4"
              >
                <div className="col-span-12 lg:col-span-6">
                  <div className="grid grid-cols-12 gap-4">
                    <Title formikProps={formikProps} />
                    <Price formikProps={formikProps} />
                    <CategoriesSelect formikProps={formikProps} />
                  </div>
                </div>
                <ChooseThumbnail formikProps={formikProps} />
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
                        <MenuBoard size="20" />
                        ایجاد
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
