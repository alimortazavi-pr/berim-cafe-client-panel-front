export interface ICategoriesState {
  categories: ICategory[];
  selectedCategory?: ICategory;
}

export interface ICategory {
  _id?: string;
  cafe: string;
  title: string;
  color: string;
  icon: string;
  deleted: boolean;
}

export interface ICategoryForm {
  title: string;
  color?: string;
  icon: string;
}
