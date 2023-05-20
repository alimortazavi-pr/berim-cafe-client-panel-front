import { RootState } from "@/store/index";

//Interfaces
import { IReservation } from "@/common/interfaces/reservations.interface";

export function reservationsSelector(state: RootState): IReservation[] {
  return state.reservations.reservations;
}