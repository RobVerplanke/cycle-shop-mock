import { useState } from 'react';
import { PriceVariantsProps } from '../../types/Product';
import { getPriceRange } from '../../utils/helperFunctions';

export default function PriceVariants({
  prices,
}: {
  prices: PriceVariantsProps;
}) {
  // Price(s) to be displayed, by default show the lowest and the highest price
  const [activeVariant, setActiveVariant] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>(getPriceRange(prices));

  // Adjust the displayed price, based on the selected price variant
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    // Get the choosen size
    const clickedSize = e.currentTarget.id;

    if (activeVariant === clickedSize) {
      setActiveVariant(''); // Deselect size button
      setPriceRange(getPriceRange(prices)); // Display default price range again
    } else {
      setActiveVariant(clickedSize); // Update selected size

      // Get the corresponding price for the choosen variant
      const selectedPrice = prices.filter(
        (price) => price.size === e.currentTarget.id
      )[0].price;

      // Set price to be displayed
      setPriceRange(`€${selectedPrice}`);
    }
  }

  return (
    <>
      <div className="price__value">{priceRange}</div>
      <div className="price__selection">
        {prices.map((price, index) => {
          return (
            <button
              key={index}
              className={
                price.size === activeVariant
                  ? 'price__variant-button--active'
                  : 'price__variant-button'
              }
              id={price.size}
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
