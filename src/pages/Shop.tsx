import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AppDispatch } from '../app/store.ts';
import { useDispatch } from 'react-redux';
import { fetchBicycles } from '../features/bicycle/bicycleSlice.ts';
import { fetchAccessories } from '../features/accessory/accessorySlice.ts';
import { ShopCategories } from '../types/Product.ts';
import ProductGrid from '../components/shop/ProductGrid.tsx';
import { SortingOption } from '../types/SortingOptions.ts';
import CategoryFilter from '../components/shop/CategoryFilter.tsx';
import PriceFilter from '../components/shop/PriceFilter.tsx';
import BreadCrumb from '../components/shop/BreadCrumb.tsx';
import SearchForm from '../components/shop/SearchForm.tsx';
import { useSearchParams } from 'react-router-dom';

function Shop() {
  const dispatch = useDispatch<AppDispatch>();

  // Determine the selected category from the url
  const { category } = useParams<{ category: ShopCategories }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Render counter for testing
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log('Render count:', renderCount.current);

  // States
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [activeSortingOption, setActiveSortingOption] =
    useState<SortingOption>('default');

  // Get all products and its data, displayed in the default order
  useEffect(() => {
    if (category === 'bicycles') {
      dispatch(
        fetchBicycles({ sort: activeSortingOption, search: searchQuery })
      );
    } else if (category === 'accessories') {
      dispatch(
        fetchAccessories({ sort: activeSortingOption, search: searchQuery })
      );
    }
  }, [dispatch, category, activeSortingOption, searchQuery]);

  // Reset sorting option to default after switching pages (category)
  useEffect(() => {
    setActiveSortingOption('default');
  }, [category]);

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
        <div className="shop__recently">
          <h5>Recently viewed products</h5>
        </div>
      </aside>
      <main className="shop__right">
        <div className="shop__breadcrumb">
          <div className="shop__breadcrumb__fixed">
            <Link to="/">Home /</Link>
          </div>
          <div className="shop__breadcrumb__path">
            <BreadCrumb />
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
              activeSortingOption={activeSortingOption}
              setActiveSortingOption={setActiveSortingOption}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Shop;
