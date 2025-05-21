import { useEffect, useState } from 'react';
import { ProductItem } from '../../types/Product';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

export default function ProductPriceVariable({
  product,
}: {
  product: ProductItem;
}) {
  // First get a list of all variable prices
  const variantsList = useSelector((state: RootState) => state.prices.variants);

  // Select the corresponding variants for this product
  const productVariants = variantsList.filter(
    (variant) => variant.accessory_id === product.id
  );

  // Create a list with all product size variants
  const productSizes = productVariants.map((variant) => variant.size);

  // Select the lowest and highest price variant for this specific product
  const lowestPrice = productVariants[0]?.price.toFixed(2);
  const highestPrice =
    productVariants[productVariants.length - 1]?.price.toFixed(2);
  const priceRange = `€${lowestPrice} - €${highestPrice}`;

  // Price(s) to be displayed, by default show the lowest and the highest price
  const [activeVariant, setActiveVariant] = useState<string>('');
  const [price, setPrice] = useState(priceRange);

  // Adjust the displayed price, based on the selected price variant
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    // Get the choosen size
    const clickedSize = e.currentTarget.id;

    if (activeVariant === clickedSize) {
      setActiveVariant('');
    } else {
      setActiveVariant(clickedSize);
    }

    // Get the corresponding price for the choosen variant
    const selectedPrice = productVariants
      .filter((variant) => variant.size === e.currentTarget.id)[0]
      .price.toFixed(2);

    // Set price to be displayed
    setPrice(`€${selectedPrice}`);
  }

  // Show pricing range when a choosen variant is unselected again
  useEffect(() => {
    if (activeVariant === '') setPrice(priceRange);
  }, [activeVariant, priceRange]);

  return (
    <>
      <div className="price__value">{price}</div>
      <div className="price__selection">
        {productSizes.map((size) => {
          return (
            <button
              className={
                size === activeVariant
                  ? 'price__variant-button--active'
                  : 'price__variant-button'
              }
              id={size}
              onClick={handleClick}
            >
              {size}
            </button>
          );
        })}
      </div>
    </>
  );
}
