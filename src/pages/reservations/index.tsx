import Head from "next/head";
import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { Badge, Table, Tooltip } from "@nextui-org/react";

//Types
import { IReservation } from "@/common/interfaces/reservations.interface";
import { reservationsProps } from "@/common/types/reservations.type";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { reservationsSelector } from "@/store/reservations/selectors";
import {
  setReservations,
  softDeleteReservation,
  toggleReservation,
} from "@/store/reservations/actions";

//Components
import NavBar from "@/components/layouts/NavBar";
import CreateReservation from "@/components/reservations/CreateReservation";

//Tools
import api from "@/common/api";
import { ClipboardClose, Reserve, Trash } from "iconsax-react";
import { toast } from "react-toastify";
import convertToPersian from "num-to-persian";

const Reservations: FC<reservationsProps> = ({ reservations }) => {
  //Redux
  const dispatch = useAppDispatch();
  const globalReservations = useAppSelector(reservationsSelector);

  //Effects
  useEffect(() => {
    dispatch(setReservations(reservations));
  }, [reservations]);

  //Functions
  async function toggleReservationFunc(reservation: IReservation) {
    try {
      await dispatch(toggleReservation(reservation._id as string));
      toast.success(
        `ساعت انتخابی شما با موفقیت ${
          !reservation.reserved ? "رزرو" : "لغو رزرو"
        } شد`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function deleteReservation(reservationId: string) {
    try {
      await dispatch(softDeleteReservation(reservationId));
      toast.success("رزرو با موفقیت حذف شد", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div>
      <Head>
        <title>بریم کافه |‌ مدیریت رزرو ها</title>
      </Head>
      <NavBar title="مدیریت رزرو ها" />
      <div className="flex items-center justify-center">
        <div className="w-full md:w-8/12 lg:10/12 xl:6/12">
          <CreateReservation />
          <Table
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="none"
            className="z-0 bg-white"
          >
            <Table.Header>
              <Table.Column
                css={{
                  borderTopRightRadius: "1rem !important",
                  borderBottomRightRadius: "1rem !important",
                  borderTopLeftRadius: "0rem !important",
                  borderBottomLeftRadius: "0rem !important",
                  textAlign: "center",
                  paddingRight: "12px",
                }}
              >
                وضعیت رزرو
              </Table.Column>
              <Table.Column css={{ textAlign: "center" }}>از ساعت</Table.Column>
              <Table.Column css={{ textAlign: "center" }}>تا ساعت</Table.Column>
              <Table.Column
                css={{
                  borderTopRightRadius: "0rem !important",
                  borderBottomRightRadius: "0rem !important",
                  borderTopLeftRadius: "1rem !important",
                  borderBottomLeftRadius: "1rem !important",
                  textAlign: "center",
                }}
              >
                <span></span>
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {globalReservations?.map((reservation) => (
                <Table.Row css={{ zIndex: "0" }} key={reservation._id}>
                  <Table.Cell css={{ textAlign: "center", cursor: "default" }}>
                    <Badge
                      color={reservation.reserved ? "success" : "error"}
                      variant="flat"
                      className="leading-none"
                    >
                      {reservation.reserved ? "رزرو شده" : "رزرو نشده"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center", cursor: "default" }}>
                    <div className="text-zinc-800 font-medium text-base">
                      <span className="leading-none">
                        {convertToPersian(reservation.from || 0)}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell css={{ textAlign: "center", cursor: "default" }}>
                    <div className="text-zinc-800 font-medium text-base">
                      <span className="leading-none">
                        {convertToPersian(reservation.to || 0)}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell css={{ cursor: "default" }}>
                    <div className="flex justify-center items-center gap-3">
                      {!reservation.reserved ? (
                        <Tooltip content={"رزرو کردن"}>
                          <span
                            onClick={() => toggleReservationFunc(reservation)}
                          >
                            <Reserve className="w-5 md:w-6 h-fit text-green-500 cursor-pointer" />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip content={"لغو رزرو"}>
                          <span
                            onClick={() => toggleReservationFunc(reservation)}
                          >
                            <ClipboardClose className="w-5 md:w-6 h-fit text-violet-500 cursor-pointer" />
                          </span>
                        </Tooltip>
                      )}

                      <Tooltip content={"حذف رزرو"}>
                        <span
                          onClick={() =>
                            deleteReservation(reservation._id as string)
                          }
                        >
                          <Trash className="w-5 md:w-6 h-fit text-rose-500 cursor-pointer" />
                        </span>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let reservations: IReservation[] = [];
  try {
    if (req.cookies.cafeAuthorization) {
      const transformedData = JSON.parse(req.cookies.cafeAuthorization);
      const response = await api.get(`/reservations`, {
        headers: {
          Authorization: `Bearer ${transformedData.token}`,
        },
      });
      reservations = response.data.reservations;
    }
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      reservations,
    },
  };
};

export default Reservations;
