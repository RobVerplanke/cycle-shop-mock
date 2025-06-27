// import { SyncLoader } from 'react-spinners';
import { ProductCard } from './ProductCard';
import {
  Accessory,
  Bicycle,
  ProductItem,
  ShopCategories,
} from '../../types/Product';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ProductGridHeader from './ProductListHeader';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Displays a header with sorting options and a list of products, depending on the given category
export default function ProductGrid({
  category,
  priceRange,
  searchParams,
  setSearchParams,
}: {
  category: ShopCategories;
  priceRange: [number, number] | null;
  searchParams: URLSearchParams;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
}) {
  // Get product data
  const bicycles = useSelector((state: RootState) => state.bicycles.bicycles);
  const accessories = useSelector(
    (state: RootState) => state.accessories.accessories
  );

  // Keep displayed products seperate from the list with all products
  const filteredAccessories = useMemo(() => {
    if (!priceRange) return [];

    return accessories.filter((product: Accessory) =>
      product.prices.some(
        (priceVariant) =>
          priceVariant.price >= priceRange[0] &&
          priceVariant.price <= priceRange[1]
      )
    );
  }, [accessories, priceRange]);

  // Prevent infinite numbers
  if (!priceRange) return null;

  // Keep displayed products seperate from the list with all products
  const filteredBicycles = bicycles.filter(
    (product: Bicycle) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Determine which products must be displayed, based on the choosen category
  const productList =
    category === 'bicycles'
      ? filteredBicycles
      : category === 'accessories'
      ? filteredAccessories
      : [];

  return (
    <>
      <div className="shop__list-header">
        <ProductGridHeader
          productList={productList}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      {/* <div className="shop__spinner">
        <SyncLoader color="#df453e" margin={6} size={12} />
      </div> */}
      {productList.map((product: ProductItem) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
