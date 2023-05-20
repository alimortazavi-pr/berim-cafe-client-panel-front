import { cafeStatusEnum } from "../enums/cafe-status.enum";

export interface IProfileState {
  cafe?: IProfile;
}

export interface IProfile {
  _id?: string;
  ownerName: string;
  name: string;
  authMobile: string;
  province: string;
  city: string;
  logo?: string;
  phones: string[];
  workingHours: ISingleWorkingHour[];
  address: string;
  about: string;
  location: [number, number];
  rate: number;
  menuViewsCount: number;
  hasVipRoom: boolean;
  notification: boolean;
  status: cafeStatusEnum;
  images: string[];
  token?: string;
}

export interface IEditProfileForm {
  ownerName: string;
  name: string;
  authMobile: string;
  province: string;
  city: string;
  about: string;
  workingHours: ISingleWorkingHour[];
  phones: string[];
  address: string;
  location: number[];
  hasVipRoom: boolean;
  notification: boolean;
}

export interface ISingleWorkingHour {
  from: string;
  to: string;
}

export interface IChangeMobileForm {
  mobile: string;
  code: string;
}
