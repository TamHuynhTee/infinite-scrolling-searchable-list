import { IProduct } from "@interfaces/index";

export type ResponseFetchProduct = {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
};
