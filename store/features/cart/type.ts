import { IProductDetail } from "../../../types/products";

export interface ICart {
  cartId: string;
  product: IProductDetail;
  amount: number;
  status: string;
}

export interface IAddCart {
  product: IProductDetail;
  amount: number;
}
