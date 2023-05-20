import { RootState } from "@/store/index";

//Interfaces
import { IItem } from "@/common/interfaces/menu.interface";

export function itemsSelector(state: RootState): IItem[] {
  return state.menu.items;
}
