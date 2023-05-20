export interface IReservationsState {
  reservations: IReservation[];
}

export interface IReservation {
  _id?: string;
  cafe: string;
  from: string;
  to: string;
  year: string;
  dayOfYear: string;
  reserved: boolean;
}

export interface IReservationForm {
  from: string;
  to: string;
}
