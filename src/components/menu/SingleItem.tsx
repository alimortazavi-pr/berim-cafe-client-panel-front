import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "@nextui-org/react";

//Types
import { singleItemProps } from "@/common/types/menu.type";

//Tools
import convertToPersian from "num-to-persian";
import priceGenerator from "price-generator";
import { Edit2 } from "iconsax-react";

const SingleItem: FC<singleItemProps> = ({ item }) => {
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
          <div className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-zinc-100 break-words mb-1">
            <span>{item.title}</span>
          </div>
          <div className="font-bold text-base md:text-lg xl:text-xl text-zinc-100 break-words mb-2">
            <span>{item.category.title}</span>
          </div>
          <div className="font-bold text-base md:text-lg xl:text-xl text-zinc-100 break-words">
            <span>{convertToPersian(priceGenerator(item.price))} تومان</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Link
            href={`/menu/${item._id}`}
            className="bg-zinc-100 rounded-lg p-1 duration-200 hover:bg-zinc-200 hover:scale-90"
          >
            <Edit2 className="text-zinc-800 w-6 h-6 md:w-8 md:h-8" variant="Bulk" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
