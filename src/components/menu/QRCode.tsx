import { useEffect, useRef, useState } from "react";
import Image from "next/image";

//Redux
import { useAppSelector } from "@/store/hooks";
import { cafeSelector } from "@/store/profile/selectors";

//Tools
import { Eye, Link, ScanBarcode } from "iconsax-react";
import { toBlob, toSvg } from "html-to-image";
import jsZip from "jszip";
import { toDataURL, toString as qrCodeToString } from "qrcode";
import { saveAs } from "file-saver";
import { Tooltip } from "@nextui-org/react";

const QRCode = () => {
  //Redux
  const cafe = useAppSelector(cafeSelector);

  //States
  const [qrCodeLink, setQrCodeLink] = useState<string>("");

  //Refs
  const qrCodeRef = useRef<HTMLDivElement>(null);

  //Effects
  useEffect(() => {
    if (cafe?.username) {
      toDataURL(`https://berimcafe.org/${cafe.username}/menu`, { width: 2000 })
        .then((url) => {
          setQrCodeLink(url);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [cafe]);

  //Functions
  async function downloadQRCode() {
    try {
      const zip = new jsZip();
      const qrCodeImg = await toBlob(qrCodeRef?.current as HTMLDivElement, {
        cacheBust: false,
      });
      const qrCodeSvg = await toSvg(qrCodeRef?.current as HTMLDivElement, {
        cacheBust: false,
      });
      const qrCodeSimpleSvg = await qrCodeToString(
        `https://berimcafe.org/${cafe?.username}/menu`,
        {
          type: "svg",
          width: 1000,
        }
      );

      await zip.file("qr-code-simple-berimcafe.org.svg", qrCodeSimpleSvg);
      await zip.file("qr-code-berimcafe.org.png", qrCodeImg as Blob);
      await zip.file(
        "qr-code-berimcafe.org.svg",
        decodeURIComponent(qrCodeSvg.split(",")[1])
      );
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "qr-code-berimcafe.org.zip");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-h-full max-w-[100vw] overflow-hidden relative flex items-center">
      <div className="absolute -top-[3000px]">
        <div
          ref={qrCodeRef}
          className="w-[1000px] h-[1000px] bg-white rounded-[100px] pt-[100px] pb-[30px] flex flex-col items-center justify-between"
        >
          <div className="flex flex-col items-center">
            <div className="font-extrabold text-[100px] leading-none">
              <span className="leading-none">{cafe?.name}</span>
            </div>
            <div className="relative w-[600px] h-[600px]">
              {qrCodeLink ? (
                <Image src={qrCodeLink} fill alt="qr-code" />
              ) : null}
            </div>
            <hr className="h-[1px] bg-black mb-7 w-[600px]" />
            <div className="text-[30px] font-semibold">
              <span>جهت نمایش منو، بارکد را اسکن کنید</span>
            </div>
          </div>
          <div className="text-[20px] font-medium">
            <span>BERIMCAFE.ORG</span>
          </div>
        </div>
      </div>
      <Tooltip content={"مشاهده منو"}>
        <a
          href={`https://berimcafe.org/${cafe?.username}/menu`}
          className="bg-zinc-100 rounded-xl h-12 w-12 duration-200 hover:bg-zinc-200 hover:scale-90 ml-2 flex items-center justify-center"
          target="_blank"
        >
          <Eye className="text-zinc-800 w-8 h-8 md:w-8 md:h-8" variant="Bulk" />
        </a>
      </Tooltip>
      <button
        type="button"
        className="text-lg font-bold text-zinc-800 flex items-center h-12 mb-2 xl:mb-0 xl:h-full px-4 bg-transparent border-2 border-zinc-600 rounded-xl hover:text-white hover:bg-zinc-800 hover:border-white duration-500"
        onClick={downloadQRCode}
      >
        <ScanBarcode className="w-6 h-6 ml-1" variant="Bold" />
        دریافت بارکد منو
      </button>
    </div>
  );
};

export default QRCode;
