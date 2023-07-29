import { FC, useState } from "react";
import { useRouter } from "next/router";

//Types
import { singleCategoryProps } from "@/common/types/categories.type";

//Redux
import { useAppDispatch } from "@/store/hooks";
import {
  setSelectedCategory,
  softDeleteCategory,
} from "@/store/categories/actions";

//Tools
import { CloseSquare, Edit, Trash } from "iconsax-react";
import { Button, Popover, Tooltip } from "@nextui-org/react";

const SingleCategory: FC<singleCategoryProps> = ({ category }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //States
  const [isDeleting, setIsDeleting] = useState(false);

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

  async function deleteCategoryFunc() {
    await dispatch(softDeleteCategory(category._id as string));
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
            className={`flex items-center justify-center border-r p-2 duration-300 text-amber-500 hover:text-amber-100 hover:bg-amber-500 cursor-pointer ${
              router.query["category-id"] &&
              router.query["category-id"] === category._id
                ? "border-rose-300"
                : "border-zinc-300"
            }`}
            onClick={removeFilter}
          >
            <CloseSquare className="w-5 h-5" />
          </span>
        </Tooltip>
      ) : null}
      <Tooltip placement={"top"} content={"حدف دسته بندی"}>
        <Popover
          placement={"bottom"}
          isOpen={isDeleting}
          onOpenChange={setIsDeleting}
        >
          <Popover.Trigger>
            <span
              className={`flex items-center justify-center border-r p-2 duration-300 text-rose-400 hover:text-rose-100 hover:bg-rose-400 cursor-pointer ${
                router.query["category-id"] &&
                router.query["category-id"] === category._id
                  ? "border-rose-300"
                  : "border-zinc-300"
              }`}
            >
              <Trash className="w-5 h-5" />
            </span>
          </Popover.Trigger>
          <Popover.Content>
            <div className="p-5">
              <div className="font-semibold text-base mb-3">
                <span>
                  با حذف دسته بندی تمام آیتم های آن هم حذف می‌شود، آیا مطمئن
                  هستید؟
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  className=""
                  auto
                  color={"default"}
                  ghost
                  onClick={() => setIsDeleting(false)}
                >
                  لغو
                </Button>
                <Button
                  className=""
                  auto
                  color={"error"}
                  onClick={deleteCategoryFunc}
                >
                  حذف
                </Button>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </Tooltip>
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
          <Edit className="w-5 h-5" />
        </span>
      </Tooltip>
    </div>
  );
};

export default SingleCategory;
