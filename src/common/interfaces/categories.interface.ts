export interface ICategoriesState {
  categories: ICategory[];
  selectedCategory?: ICategory;
}

export interface ICategory {
  _id?: string;
  cafe: string;
  title: string;
  deleted: boolean;
}

export interface ICategoryForm {
  title: string;
}
