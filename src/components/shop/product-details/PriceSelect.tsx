import { useState } from 'react';
import { PriceVariantsProps } from '../../../types/Product';
import { getPriceRange } from '../../../utils/helperFunctions';

export default function PriceSelect({
  prices,
  amount,
  onChange,
  handleAdd,
}: {
  prices: PriceVariantsProps;
  amount: number;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleAdd: (price: string, size?: string) => void;
}) {
  // Price(s) to be displayed, by default show the lowest and the highest price
  const [activeVariant, setActiveVariant] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>(getPriceRange(prices));

  // Deselect size button
  function clearPriceSelection() {
    setActiveVariant('');
  }

  // Adjust the displayed price, based on the selected price variant
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    // Get the choosen size
    const clickedSize = e.currentTarget.id;

    if (activeVariant === clickedSize) {
      clearPriceSelection(); // Deselect size button
    } else {
      setActiveVariant(clickedSize); // Update selected size

      // Get the corresponding price for the choosen variant
      const selectedPrice = prices.filter(
        (price) => price.size === e.currentTarget.id
      )[0].price;

      // Set price to be displayed
      setPriceRange(`${selectedPrice}`);
    }
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
        <input
          min="1"
          step="1"
          type="number"
          onChange={onChange}
          value={amount}
        />
        <button
          disabled={activeVariant === ''}
          onClick={() => handleAdd(priceRange, activeVariant)}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
