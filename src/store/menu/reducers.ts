import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import { IMenuState, IItem } from "@/common/interfaces/menu.interface";

//Tools

const reducers = {
  setItems: (state: IMenuState, action: PayloadAction<IItem[]>): IMenuState => {
    return {
      ...state,
      items: [...action.payload],
    };
  },
};

export default reducers;
