export interface ILayoutsState {
  asideStatus: boolean;
  provinces: IProvince[];
  icons: string[];
  statistics: IStatistics;
}

export interface IProvince {
  name: string;
  cities: ICity[];
}

export interface ICity {
  province_name: string;
  name: string;
  latitude: string;
  longitude: string;
}

export interface IImagePreview {
  url: string;
  file: File;
}

export interface IStatistics {
  itemsCount: number;
  categoriesCount: number;
  reservationsCount: number;
}
