import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { layoutsReducer } from "@/store/layouts";

//Actions from reducer
export const { setProvinces, toggleAside, setStatistics } =
  layoutsReducer.actions;

//Interfaces

//Tools
import api from "@/common/api";

//Actions from actions
export function getProvinces(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const provincesRes = await api.get("/variables/provinces");
      dispatch(setProvinces({ provinces: provincesRes.data.provinces }));
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data.message || "error");
    }
  };
}
