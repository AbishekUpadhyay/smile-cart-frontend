import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleChange = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };
  if (isNil(selectedQuantity)) {
    return <Button label="Add to cart" size="large" onClick={handleChange} />;
  }

  return <ProductQuantity {...{ slug }} />;
};

export default AddToCart;
