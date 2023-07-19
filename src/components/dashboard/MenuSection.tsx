import Link from "next/link";

//Redux
import { useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";
import { statisticsSelector } from "@/store/layouts/selectors";

//Tools
import { Eye, ReceiptItem, Setting2 } from "iconsax-react";
import convertToPersian from "num-to-persian";

const MenuSection = () => {
  //Redux
  const profile = useAppSelector(cafeSelector);
  const statistics = useAppSelector(statisticsSelector);

  return (
    <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-violet-100 shadow rounded-3xl p-5 flex flex-col justify-between">
      <div>
        <div className="mb-3">
          <div className="text-zinc-800 text-base mb-1 flex items-center gap-1">
            <Eye className="w-6 h-fit" variant="Bulk" />
            <span>تعداد بازدید منو</span>
          </div>
          <div className="border-zinc-800 text-5xl font-bold text-left">
            <span>{convertToPersian(profile?.menuViewsCount || 0)}</span>
          </div>
        </div>
        <div className="mb-3">
          <div className="text-zinc-800 text-base mb-1 flex items-center gap-1">
            <ReceiptItem className="w-6 h-fit" variant="Bulk" />
            <span>تعداد آیتم های منو</span>
          </div>
          <div className="border-zinc-800 mb-1 text-5xl font-bold text-left">
            <span>{convertToPersian(statistics?.itemsCount || 0)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Link
          href={`/menu`}
          className="bg-white rounded-lg p-1 duration-200 hover:bg-violet-200 hover:scale-90"
        >
          <Setting2
            className="text-zinc-800 w-6 h-6 md:w-8 md:h-8"
            variant="Bulk"
          />
        </Link>
      </div>
    </div>
  );
};

export default MenuSection;
