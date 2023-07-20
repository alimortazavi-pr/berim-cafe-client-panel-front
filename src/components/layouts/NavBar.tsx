import { FC } from "react";
import { Button } from "@nextui-org/react";

//Types
import { navBarProps } from "@/common/types/layouts.type";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { asideStatusSelector } from "@/store/layouts/selectors";
import { toggleAside } from "@/store/layouts/actions";

//Tools
import { HambergerMenu } from "iconsax-react";

const NavBar: FC<navBarProps> = ({ title }) => {
  //Redux
  const dispatch = useAppDispatch();
  const asideStatus = useAppSelector(asideStatusSelector);

  //Functions
  function toggleAsideFunc() {
    dispatch(toggleAside(!asideStatus));
  }

  return (
    <nav className="flex items-center justify-between mb-4 lg:mb-10">
      <div className="flex items-center gap-2">
        <div
          className="p-1 border border-zinc-800 rounded-lg hover:bg-zinc-200 hover:scale-90 duration-300 lg:hidden"
          onClick={toggleAsideFunc}
        >
          <HambergerMenu className="w-4 h-4" />
        </div>
        <div className="text-zinc-800 font-semibold md:text-lg lg:text-xl xl:text-2xl">
          <span>{title}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
