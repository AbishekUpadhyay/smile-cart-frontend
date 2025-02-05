import React, { useEffect, useState } from "react";

import productApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const debouncedSearchKey = useDebounce(searchKey);
  const fetchProducts = async () => {
    try {
      const { products } = await productApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      setProducts(products);
    } catch (error) {
      console.error("An eror occured:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggelIsInCart = slug => {
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], prevCartItems)
        : [slug, ...prevCartItems]
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchKey]);
  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              isInCart={cartItems.includes(product.slug)}
              key={product.slug}
              toggleIsInCart={() => toggelIsInCart(product.slug)}
              {...product}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductList;
