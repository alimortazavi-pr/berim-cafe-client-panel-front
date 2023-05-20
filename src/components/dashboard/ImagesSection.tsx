import { useModal } from "@nextui-org/react";

//Redux
import { useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";

//Components
import SingleImage from "@/components/images/SingleImage";
import UploadImageModal from "@/components/profile/images/UploadImageModal";
import { AddSquare } from "iconsax-react";

const ImagesSection = () => {
  //Redux
  const profile = useAppSelector(cafeSelector);

  //NextUI
  const { setVisible, bindings } = useModal();

  return (
    <div className="col-span-12">
      <div className="text-2xl md:text-3xl xl:text-4xl font-black text-center my-2 md:my-3 xl:my-5">
        <span>تصاویر کافه</span>
      </div>
      <div className="grid grid-cols-12 gap-3">
        {profile?.images.map((image) => (
          <SingleImage key={image} image={image} />
        ))}
        <div
          className="col-span-6 md:col-span-4 xl:col-span-3 flex items-center justify-center border border-dashed border-cyan-400 rounded-3xl aspect-square cursor-pointer"
          onClick={() => setVisible(true)}
        >
          <div className="text-cyan-400 flex flex-col items-center">
            <div className="font-bold text-lg md:text-2xl xl:text-3xl mb-1">
              <span>آپلود تصویر جدید</span>
            </div>
            <div>
              <AddSquare
                variant="Bulk"
                className="w-9 h-9 md:w-11 md:h-11 xl:w-14 xl:h-14"
              />
            </div>
          </div>
        </div>
        <UploadImageModal bindings={bindings} setVisible={setVisible} />
      </div>
    </div>
  );
};

export default ImagesSection;
