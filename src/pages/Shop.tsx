import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AppDispatch, RootState } from '../app/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllBicycles,
  fetchFilteredBicycles,
} from '../features/bicycle/bicycleSlice.ts';
import {
  fetchAllAccessories,
  fetchFilteredAccessories,
} from '../features/accessory/accessorySlice.ts';
import { ShopCategories } from '../types/Product.ts';
import ProductGrid from '../components/shop/ProductGrid.tsx';
import CategoryFilter from '../components/shop/CategoryFilter.tsx';
import PriceFilter from '../components/shop/PriceFilter.tsx';
import BreadCrumb from '../components/shop/BreadCrumb.tsx';
import SearchForm from '../components/shop/SearchForm.tsx';
import { useSearchParams } from 'react-router-dom';

function Shop() {
  const dispatch = useDispatch<AppDispatch>();

  // Determine the selected category from the url
  const { category } = useParams<{ category: ShopCategories }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const sortOption = searchParams.get('sort') || 'default';
  const sortDirection = searchParams.get('direction') || 'desc';

  // Render counter for testing
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log('Render count:', renderCount.current);

  // States
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  // Check if products are loaded in the state
  const bicyclesLoaded = useSelector(
    (state: RootState) => state.bicycles.allBicycles.length > 0
  );
  const accessoriesLoaded = useSelector(
    (state: RootState) => state.accessories.allAccessories.length > 0
  );

  // Only update products which are not loaded in the state
  useEffect(() => {
    if (!bicyclesLoaded) dispatch(fetchAllBicycles());
    if (!accessoriesLoaded) dispatch(fetchAllAccessories());
  }, [dispatch, bicyclesLoaded, accessoriesLoaded]);

  // Update products after change in category, sorting option or after a search request
  useEffect(() => {
    const fetchProducts = () => {
      const commonParams = {
        sort: sortOption,
        direction: sortDirection,
      };

      if (category === 'bicycles') {
        if (searchQuery.trim() === '') {
          dispatch(fetchFilteredBicycles(commonParams)); // zonder search
        } else {
          dispatch(
            fetchFilteredBicycles({
              ...commonParams,
              search: searchQuery,
            })
          );
        }
      } else if (category === 'accessories') {
        if (searchQuery.trim() === '') {
          dispatch(fetchFilteredAccessories(commonParams));
        } else {
          dispatch(
            fetchFilteredAccessories({
              ...commonParams,
              search: searchQuery,
            })
          );
        }
      }
    };

    fetchProducts();
  }, [dispatch, category, sortOption, sortDirection, searchQuery]);

  if (!category) return '';

  return (
    <div className="shop">
      <aside className="shop__aside">
        <div className="shop__search-container">
          <SearchForm />
        </div>
        <div className="shop__filter-price">
          <PriceFilter
            category={category}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
        {/* Show a list with clickable categories that display the corresponing product items  */}
        <div className="shop__filter-category">
          <h5>Filter by categories</h5>
          <CategoryFilter />
        </div>
      </aside>
      <main className="shop__right">
        <div className="shop__breadcrumb">
          <div className="shop__breadcrumb__path">
            <BreadCrumb type={category} />
          </div>
        </div>
        <div className="shop__title">
          <h2>{category}</h2>
        </div>

        {/* Items list with the header that displays the amount of results and the sorting option */}
        {/* When data is not available (yet), display a loading-spinner and don't render the header */}
        <div className="shop__product-container">
          <div className="shop__productlist">
            <ProductGrid
              category={category as ShopCategories}
              priceRange={priceRange}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Shop;
