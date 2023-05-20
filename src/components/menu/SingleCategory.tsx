import { FC } from "react";
import { useRouter } from "next/router";

//Types
import { singleCategoryProps } from "@/common/types/categories.type";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { setSelectedCategory } from "@/store/categories/actions";

//Tools
import { CloseSquare, Edit } from "iconsax-react";
import { Tooltip } from "@nextui-org/react";

const SingleCategory: FC<singleCategoryProps> = ({ category }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //Functions
  async function filterByCategory() {
    await router.replace({
      pathname: router.pathname,
      query: {
        "category-id": category._id,
      },
    });
  }

  async function setEditingCategory() {
    await dispatch(setSelectedCategory(category));
  }

  async function removeFilter() {
    await router.replace("/menu");
  }

  return (
    <div
      key={category._id}
      className={`rounded-2xl flex min-w-fit ${
        router.query["category-id"] &&
        router.query["category-id"] === category._id
          ? "border-rose-300 border-2"
          : "border-zinc-300 border"
      }`}
    >
      <Tooltip content={`فیلتر بر اساس ${category.title}`}>
        <div
          className={`text-base font-bold p-3 cursor-pointer duration-300 hover:bg-zinc-200 rounded-r-xl min-w-fit ${
            router.query["category-id"] &&
            router.query["category-id"] === category._id
              ? "text-zinc-900"
              : "text-zinc-800"
          }`}
          onClick={filterByCategory}
        >
          <span>{category.title}</span>
        </div>
      </Tooltip>
      {router.query["category-id"] &&
      router.query["category-id"] === category._id ? (
        <Tooltip content={"حدف فیلتر"}>
          <span
            className={`flex items-center justify-center border-r p-2 duration-300 text-rose-400 hover:text-rose-100 hover:bg-rose-400 cursor-pointer ${
              router.query["category-id"] &&
              router.query["category-id"] === category._id
                ? "border-rose-300"
                : "border-zinc-300"
            }`}
            onClick={removeFilter}
          >
            <CloseSquare className="w-5 h-fit" />
          </span>
        </Tooltip>
      ) : null}
      <Tooltip content={"ویرایش دسته بندی"}>
        <span
          className={`flex items-center justify-center border-r p-2 duration-300 text-blue-400 hover:text-zinc-100 hover:bg-blue-400 rounded-l-xl cursor-pointer ${
            router.query["category-id"] &&
            router.query["category-id"] === category._id
              ? "border-rose-300"
              : "border-zinc-300"
          }`}
          onClick={setEditingCategory}
        >
          <Edit className="w-5 h-fit" />
        </span>
      </Tooltip>
    </div>
  );
};

export default SingleCategory;
