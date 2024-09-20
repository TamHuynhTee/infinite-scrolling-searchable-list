import { BASE_LIMIT, BASE_SKIP } from "@constants/index";
import { ParamsFetchProduct } from "./params";
import { ResponseFetchProduct } from "./response";

const fetchListProduct = async ({
  limit = BASE_LIMIT,
  skip = BASE_SKIP,
  q,
}: ParamsFetchProduct): Promise<ResponseFetchProduct> => {
  const stack = [];
  if (q) stack.push(`q=${q}`);
  if (limit) stack.push(`limit=${limit}`);
  if (skip) stack.push(`skip=${skip}`);

  const query = stack.length ? `?${stack.join("&")}` : "";

  const response = await fetch("https://dummyjson.com/products/search" + query);
  const data = await response.json();
  return data;
};

export { fetchListProduct };
