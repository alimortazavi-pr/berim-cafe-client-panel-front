import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC, useEffect, useRef } from "react";
import Link from "next/link";
import { Tooltip, useModal } from "@nextui-org/react";

//Types
import { IItem } from "@/common/interfaces/menu.interface";
import { menuProps } from "@/common/types/menu.type";
import { ICategory } from "@/common/interfaces/categories.interface";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { itemsSelector } from "@/store/menu/selectors";
import { setItems } from "@/store/menu/actions";
import { setCategories } from "@/store/categories/actions";
import {
  categoriesSelector,
  selectedCategorySelector,
} from "@/store/categories/selectors";

//Components
import NavBar from "@/components/layouts/NavBar";
import SingleItem from "@/components/menu/SingleItem";
import SingleCategory from "@/components/menu/SingleCategory";
import CreateCategoryModal from "@/components/categories/CreateCategoryModal";
import EditCategoryModal from "@/components/categories/EditCategoryModal";
import QRCode from "@/components/menu/QRCode";

//Tools
import api from "@/common/api";
import { AddSquare } from "iconsax-react";
import { toast } from "react-toastify";

const Menu: FC<menuProps> = ({ items, categories, errorMessage }) => {
  //Redux
  const dispatch = useAppDispatch();
  const globalItems = useAppSelector(itemsSelector);
  const globalCategories = useAppSelector(categoriesSelector);
  const selectedCategory = useAppSelector(selectedCategorySelector);

  //NextUI
  const { setVisible, bindings } = useModal();
  const { setVisible: setVisibleEditCategory, bindings: bindingsEditCategory } =
    useModal();

  //Effects
  useEffect(() => {
    dispatch(setItems(items || []));
  }, [items]);

  useEffect(() => {
    dispatch(setCategories(categories || []));
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      setVisibleEditCategory(true);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [errorMessage]);

  return (
    <div className="w-full">
      <Head>
        <title>بریم کافه |‌ مدیریت منو</title>
      </Head>
      <NavBar title="مدیریت منو" />
      <div className="max-w-full flex flex-col xl:flex-row items-stretch gap-2">
        <QRCode />
        <div className="flex max-w-full h-fit min-h-[50px]">
          <div className="text-base text-zinc-800 font-semibold min-w-fit border-2 border-l-0 border-zinc-300 rounded-r-xl min-h-full flex items-center justify-center px-2 shadow">
            <span>دسته بندی ها:</span>
          </div>
          <div className="flex items-center gap-2 flex-nowrap overflow-x-auto px-2">
            {globalCategories?.map((category) => (
              <SingleCategory key={category._id} category={category} />
            ))}
          </div>
          <Tooltip content={"افزودن دسته بندی"}>
            <div
              className="text-zinc-800 min-w-fit border-2 border-r-0 border-zinc-300 rounded-l-xl min-h-full flex items-center justify-center px-2 shadow duration-200 hover:bg-zinc-300 cursor-pointer"
              onClick={() => setVisible(true)}
            >
              <AddSquare className="w-8 h-fit" />
            </div>
          </Tooltip>
        </div>
      </div>

      <hr className="h-[1px] bg-zinc-200 my-5" />
      <div className="grid grid-cols-12 gap-3">
        {globalItems?.map((item) => (
          <SingleItem key={item._id} item={item} />
        ))}
        <Link
          href={`/menu/create-item`}
          className="col-span-6 md:col-span-4 xl:col-span-3 flex items-center justify-center border border-dashed border-violet-400 rounded-3xl aspect-square"
        >
          <div className="text-violet-400 flex flex-col items-center">
            <div className="font-bold text-lg md:text-2xl xl:text-3xl mb-1">
              <span>ایجاد آیتم</span>
            </div>
            <div>
              <AddSquare
                variant="Bulk"
                className="w-9 h-9 md:w-11 md:h-11 xl:w-14 xl:h-14"
              />
            </div>
          </div>
        </Link>
      </div>
      <CreateCategoryModal bindings={bindings} setVisible={setVisible} />
      <EditCategoryModal
        bindings={bindingsEditCategory}
        setVisible={setVisibleEditCategory}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let items: IItem[] = [];
  let categories: ICategory[] = [];
  let errorMessage: string = "";
  try {
    if (req.cookies.cafeAuthorization) {
      const transformedData = JSON.parse(req.cookies.cafeAuthorization);
      //Get All Items
      const allItemsResponse = await api.get(
        `/menu/items${
          query["category-id"] ? `?category-id=${query["category-id"]}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${transformedData.token}`,
          },
        }
      );
      items = allItemsResponse.data.items;
      //Get Categories
      const categoriesResponse = await api.get(`/categories`, {
        headers: {
          Authorization: `Bearer ${transformedData.token}`,
        },
      });
      categories = categoriesResponse.data.categories;
    }
  } catch (error: any) {
    errorMessage = error.response?.data.message || "ارور از سمت سرور";
    console.log(error.response?.data);
  }

  return {
    props: {
      items,
      categories,
      errorMessage,
    },
  };
};

export default Menu;
