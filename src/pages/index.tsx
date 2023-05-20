import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC, useEffect } from "react";

//Types
import { IStatistics } from "@/common/interfaces/layouts.interface";
import { dashboardProps } from "@/common/types/layouts.type";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { setStatistics } from "@/store/layouts/actions";

//Components
import NavBar from "@/components/layouts/NavBar";
import ProfileSection from "@/components/dashboard/ProfileSection";
import MenuSection from "@/components/dashboard/MenuSection";
import CategoriesAndReservationsSection from "@/components/dashboard/CategoriesAndReservationsSection";
import ImagesSection from "@/components/dashboard/ImagesSection";

//Tools
import api from "@/common/api";

const Dashboard: FC<dashboardProps> = ({ statistics }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Effects
  useEffect(() => {
    dispatch(setStatistics(statistics));
  }, [statistics]);

  return (
    <div>
      <Head>
        <title>بریم کافه |‌ داشبورد</title>
      </Head>
      <NavBar title="داشبورد" />
      <div className="grid grid-cols-12 gap-3">
        <ProfileSection />
        <MenuSection />
        <CategoriesAndReservationsSection />
        <ImagesSection />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let statistics: IStatistics = {
    itemsCount: 0,
    categoriesCount: 0,
    reservationsCount: 0,
  };
  try {
    if (req.cookies.cafeAuthorization) {
      const transformedData = JSON.parse(req.cookies.cafeAuthorization);
      const response = await api.get(`/variables/dashboard-statistics`, {
        headers: {
          Authorization: `Bearer ${transformedData.token}`,
        },
      });
      statistics = response.data.statistics;
    }
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      statistics,
    },
  };
};

export default Dashboard;
