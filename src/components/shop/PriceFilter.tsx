import { useEffect, useState } from 'react';
import { ShopCategories } from '../../types/Product';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector } from 'react-redux';
import { selectBicyclePrices } from '../../features/bicycle/bicycleSelectors';
import { selectAccessoryPrices } from '../../features/accessory/accessorySelectors';

export default function PriceFilter({
  category,
  priceRange,
  setPriceRange,
}: {
  category: ShopCategories;
  priceRange: [number, number] | null;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number] | null>>;
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
  const hasPrices = priceList.length > 0;
  const minPrice = hasPrices ? Math.min(...priceList) : 0;
  const maxPrice = hasPrices ? Math.max(...priceList) : 0;

  // States
  const [priceFilterLowEnd, setPriceFilterLowEnd] = useState<number>(minPrice);
  const [priceFilterHighEnd, setPriceFilterHighEnd] =
    useState<number>(maxPrice);

  useEffect(() => {
    if (hasPrices) {
      setPriceFilterLowEnd(minPrice);
      setPriceFilterHighEnd(maxPrice);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, setPriceRange, hasPrices]);

  // Directly update product list when price range is adjusted on the filter
  // useEffect(() => {
  //   setPriceRange([priceFilterLowEnd, priceFilterHighEnd]);
  // }, [priceFilterLowEnd, priceFilterHighEnd, setPriceRange]);

  // Check if prices are loaded
  if (!hasPrices) return null;
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
          // Reduces extra renders, in opposite of live update using the UseEffect hook
          onChangeComplete={(value) => {
            if (Array.isArray(value)) {
              const [min, max] = value;
              setPriceRange([min, max]);
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
