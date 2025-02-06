import { PageNotFound, Header, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Button } from "neetoui";
import { isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const { t } = useTranslation();
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

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
            <Carousel />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>{t("productMrp", { mrp })}</p>
          <p className="font-semibold">
            {t("productOfferPrice", { offerPrice })}
          </p>
          <p className="font-semibold text-green-600">
            {t("productDiscount", { discountPercentage })}
          </p>
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
