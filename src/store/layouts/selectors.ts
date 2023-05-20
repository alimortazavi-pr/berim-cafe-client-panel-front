import { IProvince, IStatistics } from "@/common/interfaces/layouts.interface";
import { RootState } from "..";

export function provincesSelector(state: RootState): IProvince[] {
  return state.layouts.provinces;
}

export function asideStatusSelector(state: RootState): boolean {
  return state.layouts.asideStatus;
}

export function statisticsSelector(state: RootState): IStatistics {
  return state.layouts.statistics;
}
