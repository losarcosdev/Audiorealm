import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "../interfaces/products-2";

export const useProducts = ({
  config,
  url,
}: {
  config?: SWRConfiguration;
  url: string;
}) => {
  const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

  return {
    products: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
