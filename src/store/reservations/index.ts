import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { IReservationsState } from "@/common/interfaces/reservations.interface";

//Reducers
import reducers from "@/store/reservations/reducers";

const initialState: IReservationsState = {
  reservations: [],
};

export const reservationsReducer = createSlice({
  name: "reservations",
  initialState,
  reducers,
});

export default reservationsReducer.reducer;
