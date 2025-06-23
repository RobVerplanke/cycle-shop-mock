import { useEffect, useState } from 'react';
import { ShopCategories } from '../../types/Product';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector } from 'react-redux';
import { selectBicyclePrices } from '../../features/bicycle/bicycleSelectors';
import { selectAccessoryPrices } from '../../features/accessory/accessorySelectors';

export default function PriceFilter({
  category,
}: {
  category: ShopCategories;
}) {
  // Extract prices by using selectors
  const bicyclePrices = useSelector(selectBicyclePrices);
  const accessoryPrices = useSelector(selectAccessoryPrices);

  // Determine active prices
  const priceList =
    category === 'bicycles'
      ? bicyclePrices
      : category === 'accessories'
      ? accessoryPrices
      : [];

  // Calculate price range
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  // States
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [priceFilterLowEnd, setPriceFilterLowEnd] = useState<number>(0);
  const [priceFilterHighEnd, setPriceFilterHighEnd] = useState<number>(0);

  // Load prices and update on category change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setPriceFilterLowEnd(minPrice);
    setPriceFilterHighEnd(maxPrice);
  }, [maxPrice, minPrice]);

  // Check if prices are loaded correctly
  if (!priceRange) return null;

  return (
    <>
      <div className="shop__filter-title">
        <h5>Filter by price</h5>
      </div>
      <div className="shop__filter-container">
        <Slider
          range
          min={minPrice}
          max={maxPrice}
          value={[priceFilterLowEnd, priceFilterHighEnd]}
          allowCross={false}
          pushable={10}
          onChange={(value) => {
            if (Array.isArray(value)) {
              const [min, max] = value;
              setPriceFilterLowEnd(min);
              setPriceFilterHighEnd(max);
            }
          }}
        />
      </div>
      {Number.isFinite(priceFilterLowEnd) &&
        Number.isFinite(priceFilterHighEnd) && (
          <div className="shop__filter-range">
            <div>€{Math.round(priceFilterLowEnd)}</div>
            <div>€{Math.round(priceFilterHighEnd)}</div>
          </div>
        )}
    </>
  );
}
