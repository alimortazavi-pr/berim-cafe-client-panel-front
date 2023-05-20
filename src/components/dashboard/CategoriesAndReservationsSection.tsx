import Link from "next/link";

//Redux
import { useAppSelector } from "@/store/hooks";
import { statisticsSelector } from "@/store/layouts/selectors";

//Tools
import { Category, Reserve, Setting2 } from "iconsax-react";
import convertToPersian from "num-to-persian";

const CategoriesAndReservationsSection = () => {
  //Redux
  const statistics = useAppSelector(statisticsSelector);

  return (
    <div className="col-span-12 xl:col-span-4">
      <div className="grid grid-cols-12 gap-3">
        {/* Categories Section */}
        <div className="col-span-12 md:col-span-6 xl:col-span-12 bg-cyan-100 shadow rounded-3xl p-5">
          <div className="">
            <div className="mb-2 flex items-start justify-between">
              <div className="text-zinc-800 text-base flex items-center gap-1">
                <Category className="w-6 h-fit" variant="Bulk" />
                <span>تعداد دسته بندی ها</span>
              </div>
              <div className="border-zinc-800 text-5xl font-bold flex-1 text-left">
                <span>{convertToPersian(statistics.categoriesCount || 0)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={`/menu`}
              className="bg-white rounded-lg p-1 duration-200 hover:bg-cyan-200 hover:scale-90"
            >
              <Setting2
                className="text-zinc-800 w-6 h-6 md:w-8 md:h-8"
                variant="Bulk"
              />
            </Link>
          </div>
        </div>
        {/* Reservations Section */}
        <div className="col-span-12 md:col-span-6 xl:col-span-12 bg-teal-100 shadow rounded-3xl p-5">
          <div className="">
            <div className="mb-2 flex items-start justify-between">
              <div className="text-zinc-800 text-base flex items-center gap-1">
                <Reserve className="w-6 h-fit" variant="Bulk" />
                <span>تعداد رزروی های امروز</span>
              </div>
              <div className="border-zinc-800 text-5xl font-bold flex-1 text-left">
                <span>
                  {convertToPersian(statistics.reservationsCount || 0)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={`/reservations`}
              className="bg-white rounded-lg p-1 duration-200 hover:bg-teal-200 hover:scale-90"
            >
              <Setting2
                className="text-zinc-800 w-6 h-6 md:w-8 md:h-8"
                variant="Bulk"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndReservationsSection;