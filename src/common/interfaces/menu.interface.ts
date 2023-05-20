import { ICategory } from "./categories.interface";

export interface IMenuState {
  items: IItem[];
}

export interface IItem {
  _id?: string;
  cafe: string;
  category: ICategory;
  title: string;
  price: string;
  thumbnailImage?: string;
  deleted: boolean;
}

export interface IItemForm {
  title: string;
  category: string;
  price: string;
  thumbnailImage: string | File;
}