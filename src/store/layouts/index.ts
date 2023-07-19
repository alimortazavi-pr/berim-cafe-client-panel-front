import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { ILayoutsState } from "@/common/interfaces/layouts.interface";

//Reducers
import reducers from "@/store/layouts/reducers";

const initialState: ILayoutsState = {
  provinces: [],
  icons: [],
  asideStatus: false,
  statistics: {
    itemsCount: 0,
    categoriesCount: 0,
    reservationsCount: 0,
  },
};

export const layoutsReducer = createSlice({
  name: "layouts",
  initialState,
  reducers,
});

export default layoutsReducer.reducer;
