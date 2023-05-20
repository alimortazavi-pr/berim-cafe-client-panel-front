import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { IMenuState } from "@/common/interfaces/menu.interface";

//Reducers
import reducers from "@/store/menu/reducers";

const initialState: IMenuState = {
  items : []
};

export const menuReducer = createSlice({
  name: "menu",
  initialState,
  reducers,
});

export default menuReducer.reducer;
