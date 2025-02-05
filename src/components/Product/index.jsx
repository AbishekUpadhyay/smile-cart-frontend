import { useEffect, useState } from "react";

import productApi from "apis/products";
import { PageNotFound, Header, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const fetchProduct = async () => {
    try {
      const product = await productApi.show(slug);
      setProduct(product);
    } catch (error) {
      console.error("An error occured:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  if (isLoading) return <PageLoader />;

  if (isError) return <PageNotFound />;
  const { name, description, mrp, offerPrice, imageUrl, imageUrls } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={append(imageUrl, imageUrls)} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: ₹{mrp}</p>
          <p className="font-semibold">Offer price: ₹{offerPrice}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
          <AddToCart {...{ slug }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
