import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { reservationsReducer } from "@/store/reservations";

//Actions from reducer
export const { setReservations } = reservationsReducer.actions;

//Interfaces
import { IReservationForm } from "@/common/interfaces/reservations.interface";

//Tools
import api from "@/common/api";

//Actions from actions
export function getReservations(): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.get(`/reservations`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(setReservations(res.data.reservations));
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function createReservation(form: IReservationForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.post(`/reservations`, form, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(
          setReservations([
            ...getState().reservations.reservations,
            res.data.reservation,
          ])
        );
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function toggleReservation(reservationId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        await api.put(
          `/reservations/toggle-reserved/${reservationId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getState().auth.token}`,
            },
          }
        );
        await dispatch(
          setReservations(
            getState().reservations.reservations.map((reservation) =>
              reservation._id === reservationId
                ? { ...reservation, reserved: !reservation.reserved }
                : reservation
            )
          )
        );
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}

export function softDeleteReservation(reservationId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.isAuth) {
        const res = await api.delete(`/reservations/${reservationId}`, {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });
        await dispatch(
          setReservations(
            getState().reservations.reservations.filter(
              (reservation) => reservation._id !== reservationId
            )
          )
        );
      }
    } catch (err: any) {
      console.log(err);

      throw new Error(err.response.data.message);
    }
  };
}
