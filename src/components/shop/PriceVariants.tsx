import { useState } from 'react';
import { PriceVariantsProps } from '../../types/Product';
import { getPriceRange } from '../../utils/helperFunctions';

export default function PriceVariants({
  prices,
}: {
  prices: PriceVariantsProps;
}) {
  const [activeVariant, setActiveVariant] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>(getPriceRange(prices));

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const clickedSize = e.currentTarget.value;

    if (activeVariant === clickedSize) {
      setActiveVariant('');
      setPriceRange(getPriceRange(prices));
    } else {
      setActiveVariant(clickedSize);
      const selectedPrice = prices.find(
        (price) => price.size === clickedSize
      )?.price;
      setPriceRange(
        selectedPrice ? `€${selectedPrice}` : getPriceRange(prices)
      );
    }
  }

  return (
    <>
      <div className="price__value" id="price-label">
        {priceRange}
      </div>

      <div
        className="price__selection"
        role="radiogroup"
        aria-labelledby="price-label"
      >
        {prices.map((price, index) => {
          const isActive = price.size === activeVariant;

          return (
            <button
              key={index}
              type="button"
              className={
                isActive
                  ? 'price__variant-button--active'
                  : 'price__variant-button'
              }
              value={price.size}
              role="radio"
              aria-checked={isActive}
              aria-label={`Variant ${price.size}`}
              onClick={handleClick}
            >
              {price.size}
            </button>
          );
        })}
      </div>
    </>
  );
}
