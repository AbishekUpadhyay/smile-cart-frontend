import { useEffect, useState, useRef } from "react";

import classNames from "classnames";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom";

const Carousel = () => {
  const { slug } = useParams();
  const { data: { imageUrl, imageUrls: partialImageUrls, title } = {} } =
    useShowProduct(slug);
  const imageUrls = append(imageUrl, partialImageUrls);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timer = useRef(null);
  const resetTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(handleNext, 3000);
  };

  useEffect(() => {
    timer.current = setInterval(handleNext, 3000);

    return () => clearTimeout(timer.current);
  }, []);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  return (
    <div className="flex items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={() => {
          handlePrev();
          resetTimer();
        }}
      />
      <div>
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <div className="flex justify-center space-x-1">
          {imageUrls.map((_, index) => (
            <span
              key={index}
              className={classNames(
                "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
                { "neeto-ui-bg-black": index === currentIndex }
              )}
              onClick={() => {
                setCurrentIndex(index);
                resetTimer();
              }}
            />
          ))}
        </div>
      </div>
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={() => {
          handleNext();
          resetTimer();
        }}
      />
    </div>
  );
};

export default Carousel;
