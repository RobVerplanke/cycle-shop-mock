import { useState } from 'react';
import { PriceVariantsProps } from '../../types/Product';

export default function PriceRange({ prices }: { prices: PriceVariantsProps }) {
  // Select the lowest and highest price variant for this specific product
  function getPriceRange(prices: PriceVariantsProps): string {
    if (!prices.length) return 'No prices available';

    const sorted = [...prices].sort((a, b) => a.price - b.price);
    const lowest = sorted[0].price;
    const highest = sorted[sorted.length - 1].price;

    return lowest === highest ? `€${lowest}` : `€${lowest} - €${highest}`;
  }

  // Price(s) to be displayed, by default show the lowest and the highest price
  const [priceRange] = useState<string>(getPriceRange(prices));

  return (
    <>
      <div className="price__value">{priceRange}</div>
    </>
  );
}
