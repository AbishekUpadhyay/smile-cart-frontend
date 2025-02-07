import { QUERY_KEYS } from "constants/query";

import productApi from "apis/products";
import { existsBy } from "neetocist";
import { Toastr } from "neetoui";
import { prop } from "ramda";
import { useQueries, useQuery } from "react-query";
import useCartItemsStore from "stores/useCartItemsStore";

export const useShowProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productApi.show(slug),
  });
export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productApi.fetch(params),
    keepPreviousData: true,
  });
export const useFetchCartProducts = slugs => {
  const { cartItems, setSelectedQuantity } = useCartItemsStore();
  const responses = useQueries(
    slugs.map(slug => ({
      queryKey: [QUERY_KEYS.PRODUCTS, slug],
      queryFn: () => productApi.show(slug),
      onSuccess: ({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;
        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(
            `${name} is no longer available and has been removed from cart`,
            {
              autoClose: 2000,
            }
          );
        }
      },
    }))
  );
  const data = responses.map(prop("data")).filter(Boolean);
  const isLoading = existsBy({ isLoading: true }, responses);

  return { data, isLoading };
};
