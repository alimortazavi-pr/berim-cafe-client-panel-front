import Image from "next/image";
import Link from "next/link";

//Redux
import { useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";

//Tools
import cafeLogo from "@/assets/images/cafe-logo.png";
import { Edit2 } from "iconsax-react";

const ProfileSection = () => {
  //Redux
  const profile = useAppSelector(cafeSelector);

  return (
    <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white shadow rounded-3xl p-5 flex flex-col justify-between">
      <div>
        <div className="relative w-[70px] h-[70px] border rounded-full border-zinc-800 mb-3">
          {profile?.logo ? (
            <Image
              src={`http://localhost:7777/${profile.logo}`}
              alt=""
              fill
              className="rounded-full object-cover object-center"
            />
          ) : (
            <Image
              src={cafeLogo}
              fill
              alt=""
              className="rounded-full object-cover object-center"
            />
          )}
        </div>
        <div className="text-zinc-800 font-semibold text-2xl mb-2">
          <span>{profile?.name}</span>
        </div>
        <div className="text-zinc-800 font-medium text-base break-words flex items-center">
          <span>{profile?.province}</span>
          <span className="mx-0.5">,</span>
          <span>{profile?.province}</span>
        </div>
        <div className="text-zinc-800 font-medium text-base overflow-hidden break-words max-h-[50%]">
          <p className="mb-0 h-full">{profile?.address}</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Link
          href={`/profile`}
          className="bg-zinc-100 rounded-lg p-1 duration-200 hover:bg-zinc-200 hover:scale-90"
        >
          <Edit2
            className="text-zinc-800 w-6 h-6 md:w-8 md:h-8"
            variant="Bulk"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProfileSection;
