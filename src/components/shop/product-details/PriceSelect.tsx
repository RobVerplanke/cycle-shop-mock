import { useState } from 'react';
import { PriceVariantsProps } from '../../../types/Product';

export default function PriceSelect({
  prices,
}: {
  prices: PriceVariantsProps;
}) {
  // Select the lowest and highest price variant for this specific product
  function getPriceRange(prices: PriceVariantsProps): string {
    if (!prices.length) return 'No prices available';

    const sorted = [...prices].sort((a, b) => a.price - b.price);
    const lowest = sorted[0].price;
    const highest = sorted[sorted.length - 1].price;

    return lowest === highest ? `€${lowest}` : `€${lowest} - €${highest}`;
  }

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

  function clearPriceSelection() {
    setActiveVariant(''); // Deselect size button
  }

  return (
    <div className="details__price__selection">
      <div className="details__price__selection__buttons">
        {prices.map((price, index) => (
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
        ))}
      </div>

      {/* Altijd renderen, animatie op basis van klasse */}
      <div
        className={`details__price__selection__container ${
          activeVariant !== '' ? 'show' : ''
        }`}
      >
        <button
          className="details__price__selection__clear"
          onClick={clearPriceSelection}
        >
          Clear
        </button>
        <div className="details__price__selection__value">{priceRange}</div>
      </div>
      <div className="top-section__add-item">
        <input type="number" />
        <button disabled={activeVariant === ''}>ADD TO CART</button>
      </div>
    </div>
  );
}
