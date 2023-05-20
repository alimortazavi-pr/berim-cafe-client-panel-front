import { FC } from "react";
import dynamic from "next/dynamic";

//Types
import { IEditProfileForm } from "@/common/interfaces/profile.interface";

//Tools
import { FormikProps } from "formik";
const NeshanMap: any = dynamic(() => import("react-neshan-map-leaflet"), {
  ssr: false,
});

const SelectLocation: FC<{
  formikProps: FormikProps<IEditProfileForm>;
}> = ({ formikProps }) => {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    formikProps;

  return (
    <div className="col-span-12">
      <div
        className={`mb-[0.375rem] ${
          errors.location && touched.location ? "text-[#F31260]" : "text-black"
        } text-sm`}
      >
        <label htmlFor="provinces">انتخاب لوکیشن</label>
      </div>
      <div className="w-full h-80 xl:h-96">
        <NeshanMap
          options={{
            key: "web.9fbee7961b844ccb881385a28814ac7b",
            center:
              values.location.length <= 0
                ? [34.62909020964606, 50.86121208965779]
                : values.location,
            width: "100%",
            zoom: 13,
            maptype: "standard-day",
          }}
          onInit={(L: any, myMap: any) => {
            let marker = L.marker(
              values.location.length <= 0
                ? [34.62909020964606, 50.86121208965779]
                : values.location
            )
              .addTo(myMap)
              .bindPopup("لوکیشن دقیق کافه شما");

            myMap.on("click", function (e: any) {
              marker.setLatLng(e.latlng);
              setFieldValue("location", [e.latlng.lat, e.latlng.lng]);
            });
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "17px",
          }}
        />
      </div>
      {errors.location && touched.location ? (
        <div className="text-[#F31260] text-sm mt-0.5">
          <span>{errors.location}</span>
        </div>
      ) : null}
    </div>
  );
};

export default SelectLocation;
