import { IProductDetail } from "../../../types/products";

export enum PopupStatus {
  empty,
  success,
  failed,
}

export interface IPopupStatus {
  status: PopupStatus;
  message?: string;
  link?: string;
}
