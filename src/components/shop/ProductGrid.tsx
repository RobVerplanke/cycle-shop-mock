// import { SyncLoader } from 'react-spinners';
import { ProductCard } from './ProductCard';
import { ProductItem, ShopCategories } from '../../types/Product';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ProductGridHeader from './ProductListHeader';
import { SortingOption } from '../../types/SortingOptions';

// Displays a header with sorting options and a list of products, depending on the given category
export default function ProductGrid({
  category,
  activeSortingOption,
  setActiveSortingOption,
}: {
  category: ShopCategories;
  activeSortingOption: SortingOption;
  setActiveSortingOption: React.Dispatch<React.SetStateAction<SortingOption>>;
}) {
  // Get product data
  const bicycles = useSelector((state: RootState) => state.bicycles.bicycles);
  const accessories = useSelector(
    (state: RootState) => state.accessories.accessories
  );

  // Determine which products must be displayed, based on the choosen category
  const productList =
    category === 'bicycles'
      ? bicycles
      : category === 'accessories'
      ? accessories
      : [];

  return (
    <>
      <div className="shop__list-header">
        <ProductGridHeader
          category={category}
          activeSortingOption={activeSortingOption}
          setActiveSortingOption={setActiveSortingOption}
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
