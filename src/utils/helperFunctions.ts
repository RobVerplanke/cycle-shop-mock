import { Bicycle, PriceVariantsProps, ProductItem } from '../types/Product';

// Capitalize only the first letter of a string
export function capitalizeString(name: string) {
  // Lowercase full string
  const lowerCased: string = name.toLowerCase();

  // Uppercase first letter
  return lowerCased[0].toUpperCase() + lowerCased.slice(1);
}

// Select the lowest and highest price variant for this specific product
export function getPriceRange(prices: PriceVariantsProps): string {
  if (!prices.length) return 'No prices available';

  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const lowest = sorted[0].price;
  const highest = sorted[sorted.length - 1].price;

  return lowest === highest ? `€${lowest}` : `€${lowest} - €${highest}`;
}

// Check if the product has one price or multiple prices for each variant (size)
export function hasFixedPrice(product: ProductItem): product is Bicycle {
  return (product as Bicycle).price !== undefined;
}
