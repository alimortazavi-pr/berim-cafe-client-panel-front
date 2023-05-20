//Interfaces

import {
  ILayoutsState,
  IProvince,
  IStatistics,
} from "@/common/interfaces/layouts.interface";
import { PayloadAction } from "@reduxjs/toolkit";

//Tools

const reducers = {
  setProvinces: (
    state: ILayoutsState,
    action: PayloadAction<{ provinces: IProvince[] }>
  ): ILayoutsState => {
    return {
      ...state,
      provinces: action.payload.provinces,
    };
  },

  toggleAside: (
    state: ILayoutsState,
    action: PayloadAction<boolean>
  ): ILayoutsState => {
    return {
      ...state,
      asideStatus: action.payload,
    };
  },

  setStatistics: (
    state: ILayoutsState,
    action: PayloadAction<IStatistics>
  ): ILayoutsState => {
    return {
      ...state,
      statistics: action.payload,
    };
  },
};

export default reducers;
