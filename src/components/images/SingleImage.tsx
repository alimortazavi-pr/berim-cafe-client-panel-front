import Image from "next/image";
import { FC, useState } from "react";
import { Button, Loading, Popover } from "@nextui-org/react";

//Types
import { singleImageProps } from "@/common/types/cafe.type";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { removeImage } from "@/store/profile/actions";

//Tools
import { Trash } from "iconsax-react";
import { toast } from "react-toastify";

const SingleImage: FC<singleImageProps> = ({ image }) => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  //Functions
  async function deleteImage() {
    setIsLoading(true);
    try {
      await dispatch(removeImage(image));
      toast.success("تصویر باموفقیت حذف شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`col-span-6 md:col-span-4 xl:col-span-3 flex items-center justify-center rounded-3xl aspect-square relative`}
    >
      <Image
        src={`https://api-panel-berim-cafe.cyclic.cloud${image}`}
        fill
        alt=""
        className="rounded-3xl object-cover object-center"
      />
      <Popover isOpen={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
        <Popover.Trigger>
          <div className="bg-zinc-100 rounded-xl p-1 duration-200 hover:bg-zinc-200 hover:scale-90 absolute bottom-4 left-4 cursor-pointer">
            <Trash
              className="text-rose-500 w-6 h-6 md:w-8 md:h-8"
              variant="Bulk"
            />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <div className="p-4">
            <div className="text-zinc-800 font-semibold mb-3">
              <span>آیا از حذف تصویر مطمئن هستید؟</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                light
                disabled={isLoading}
                onClick={() => setPopoverIsOpen(false)}
              >
                لغو
              </Button>
              <Button
                size="sm"
                shadow
                color="error"
                onClick={deleteImage}
                disabled={isLoading}
              >
                {isLoading ? <Loading color="currentColor" size="sm" /> : "حذف"}
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default SingleImage;
