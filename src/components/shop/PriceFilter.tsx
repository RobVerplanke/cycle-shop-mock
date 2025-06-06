import { useEffect, useMemo, useState } from 'react';
import { getPriceRange } from '../../utils/helperFunctions';
import { Bicycle, PriceFilterProps } from '../../types/Product';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function PriceFilter({
  category,
  productList,
  variantsList,
}: PriceFilterProps) {
  // Keep track of the current lowest and highest prices
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  // Control values for the price filter
  const [priceFilterLowEnd, setPriceFilterLowEnd] = useState<number>(0);
  const [priceFilterHighEnd, setPriceFilterHighEnd] = useState<number>(0);

  // Keep pricerange variable stable to prevent unnecessary rerenders
  const calculatedPriceRange = useMemo(() => {
    if (category === 'accessories') return getPriceRange(variantsList);
    if (category === 'bicycles') return getPriceRange(productList as Bicycle[]);
    return [0, 0];
  }, [category, productList, variantsList]);

  // When the prices on the page change (user changes category), update the price filter with the new prices
  useEffect(() => {
    setPriceRange([calculatedPriceRange[0], calculatedPriceRange[1]]);
    setPriceFilterLowEnd(calculatedPriceRange[0]);
    setPriceFilterHighEnd(calculatedPriceRange[1]);
  }, [calculatedPriceRange]);

  if (!priceRange) return null;

  return (
    <>
      <div className="shop__filter-title">
        <h5>Filter by price</h5>
      </div>
      <div className="shop__filter-container">
        <Slider
          range
          min={priceRange[0]}
          max={priceRange[1]}
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
