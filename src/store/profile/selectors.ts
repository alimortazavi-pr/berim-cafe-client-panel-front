import { RootState } from "@/store/index";

//Interfaces
import { IProfile } from "@/common/interfaces/profile.interface";

export function cafeSelector(state: RootState): IProfile | undefined {
  return state.profile.cafe;
}
