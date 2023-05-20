import { ICategory } from "../interfaces/categories.interface";
import { IItem } from "../interfaces/menu.interface";

export type menuProps = {
  items: IItem[];
  categories: ICategory[];
  errorMessage: string;
};

export type singleItemProps = {
  item: IItem;
};

export type editItemProps = {
  item: IItem;
};
