import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { Button, Popover } from "@nextui-org/react";

//Types
import { singleItemProps } from "@/common/types/menu.type";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { softDeleteItem } from "@/store/menu/actions";

//Tools
import convertToPersian from "num-to-persian";
import priceGenerator from "price-generator";
import { Edit2, Trash } from "iconsax-react";

const SingleItem: FC<singleItemProps> = ({ item }) => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [isDeleting, setIsDeleting] = useState(false);

  //Functions
  async function deleteItemFunc() {
    await dispatch(softDeleteItem(item._id as string));
  }

  return (
    <div
      className={`col-span-6 md:col-span-4 xl:col-span-3 flex items-center justify-center rounded-3xl aspect-square relative`}
    >
      {item.thumbnailImage ? (
        <Image
          src={`https://api-panel.berimcafe.org${item.thumbnailImage}`}
          fill
          alt=""
          className="w-full h-full rounded-3xl object-cover object-center"
        />
      ) : null}
      <div className="w-full h-full rounded-3xl bg-zinc-950 bg-opacity-40 z-10 p-3 md:p-5 flex flex-col justify-between">
        <div>
          <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-zinc-100 truncate mb-1 w-full">
            <span>{item.title}</span>
          </div>
          <div className="font-bold text-base md:text-lg xl:text-xl text-zinc-100 truncate w-full mb-2">
            <span>{item.category.title}</span>
          </div>
          <div className="font-bold text-base md:text-lg xl:text-xl text-zinc-100 truncate w-full">
            <span>{convertToPersian(priceGenerator(item.price))} تومان</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Popover
            placement={"bottom"}
            isOpen={isDeleting}
            onOpenChange={setIsDeleting}
          >
            <Popover.Trigger>
              <div className="bg-rose-100 rounded-lg p-1 duration-200 hover:bg-rose-200 hover:scale-90 cursor-pointer">
                <Trash
                  className="text-zinc-800 w-6 h-6 md:w-8 md:h-8"
                  variant="Bulk"
                />
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <div className="p-5">
                <div className="font-semibold text-base mb-3">
                  <span>آیا مطمئن هستید؟</span>
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
                    onClick={deleteItemFunc}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </Popover.Content>
          </Popover>

          <Link
            href={`/menu/${item._id}`}
            className="bg-zinc-100 rounded-lg p-1 duration-200 hover:bg-zinc-200 hover:scale-90"
          >
            <Edit2
              className="text-zinc-800 w-6 h-6 md:w-8 md:h-8"
              variant="Bulk"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
