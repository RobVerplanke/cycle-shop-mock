import { Bicycle, Variant } from '../types/Product';

// Capitalize only the first letter of a string
export function capitalizeString(name: string) {
  // Lowercase full string
  const lowerCased: string = name.toLowerCase();

  // Uppercase first letter
  return lowerCased[0].toUpperCase() + lowerCased.slice(1);
}

// For the price filter, return the lowest and highest price from the list
export function getPriceRange(products: Bicycle[] | Variant[]) {
  const prices: number[] = products.map((product) => product.price);

  const sortedList = prices.sort(function (a, b) {
    return a - b;
  });

  const lowestPrice = Number(sortedList[0]);
  const highestPrice = Number(sortedList[sortedList.length - 1]);

  return [lowestPrice, highestPrice];
}
