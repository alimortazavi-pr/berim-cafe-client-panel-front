import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import {
  IReservationsState,
  IReservation,
} from "@/common/interfaces/reservations.interface";

//Tools

const reducers = {
  setReservations: (
    state: IReservationsState,
    action: PayloadAction<IReservation[]>
  ): IReservationsState => {
    return {
      ...state,
      reservations: [...action.payload],
    };
  },
};

export default reducers;
