import { useEffect, useState } from 'react';
import { ProductItem, Variant } from '../../types/Product';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadItems } from '../../features/prices/variablePriceSlice';

export default function ProductPriceVariable({
  product,
}: {
  product: ProductItem;
}) {
  const dispatch = useDispatch<AppDispatch>();

  // Get a list of all variable prices from the accessories
  const priceVariants: Variant[] = useSelector(
    (state: RootState) => state.variants.variants
  );

  // Select the corresponding variants for this product
  const productVariants = priceVariants.filter(
    (variant) => variant.accessory_id === product.id
  );

  // Create a list with all product size variants
  const productSizes = productVariants.map((variant) => variant.size);

  // Select the lowest and highest price variant for this specific product
  const lowestPrice = productVariants[0]?.price;
  const highestPrice = productVariants[productVariants.length - 1]?.price;
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
    const selectedPrice = productVariants.filter(
      (variant) => variant.size === e.currentTarget.id
    )[0].price;

    // Set price to be displayed
    setPrice(`€${selectedPrice}`);
  }

  useEffect(() => {
    dispatch(loadItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show pricing range when a choosen variant is unselected again
  useEffect(() => {
    if (activeVariant === '') setPrice(priceRange);
  }, [activeVariant, priceRange]);

  return (
    <>
      <div className="price__value">{price}</div>
      <div className="price__selection">
        {productSizes.map((size, index) => {
          return (
            <button
              key={index}
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
