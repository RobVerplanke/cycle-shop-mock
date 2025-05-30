import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { Link, useParams } from 'react-router-dom';
import { capitalizeString } from '../utils/helperFunctions';
import { ProductCard } from '../components/ProductCard';
import CategoryOverview from '../components/shop/CategoryOverview';
import { useEffect, useState } from 'react';
import { loadAccessories } from '../features/products/accessorySlice';
import { ProductItem } from '../types/Product';
import { loadBicycles } from '../features/products/bikeSlice';
import ProductListHeader from '../components/shop/ProductListHeader';
import { SyncLoader } from 'react-spinners';
import { SortingOptions } from '../types/SortingOptions';
import { loadReviews } from '../features/reviews/reviewSlice';

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();

  // Determine the selected category from the url
  const { category } = useParams<{ category: string }>();

  // Keep track of the active sorting option
  const [sortingOption, setSortingOption] = useState('default');

  // Collect the corresponding data
  const productList = useSelector((state: RootState) => {
    if (category === 'bicycles') return state.bicycles.productList;
    if (category === 'accessories') return state.accessories.productList;
    return [];
  });

  // Get loading status to show short message when data is loading
  const isLoading = useSelector((state: RootState) =>
    category === 'bicycles' ? state.bicycles.loading : state.accessories.loading
  );

  // Update displayed products when category is changed
  // Load all products when loading page to keep the amount of categories in 'categoryOverview' updated
  useEffect(() => {
    dispatch(loadBicycles(sortingOption as SortingOptions));
    dispatch(loadAccessories(sortingOption as SortingOptions));
    dispatch(loadReviews());
  }, [category, sortingOption, dispatch]);

  return (
    <div className="shop">
      <aside className="shop__aside">
        <div className="shop__search-container">
          <div className="shop__search-title">Search</div>
          <div className="shop__search-form">
            <input type="text" placeholder="Search products..." />
            <button type="submit">SEARCH</button>
          </div>
        </div>
        <div className="shop__filter-price">
          <h5>Filter by price</h5>
        </div>

        {/* Show a list with clickable categories that display the corresponing product items  */}
        <div className="shop__filter-category">
          <h5>Filter by categories</h5>
          <CategoryOverview />
        </div>
        <div className="shop__recently">
          <h5>Recently viewed products</h5>
        </div>
      </aside>
      <main className="shop__right">
        <div className="shop__breadcrumb">
          <Link to="/">Home</Link>
          <span> / {capitalizeString(category as string)}</span>
        </div>
        <div className="shop__title">
          <h2>{category}</h2>
        </div>

        {/* Items list with the header that displays the amount of results and the sorting option */}
        {/* When data is not available (yet), display a loading-spinner and don't render the header */}
        <div className="shop__product-container">
          {isLoading ? (
            ''
          ) : (
            <div className="shop__list-header">
              <ProductListHeader
                productList={productList}
                setSortingOption={setSortingOption}
                sortingOption={sortingOption}
              />
            </div>
          )}
          <div className="shop__productlist">
            {isLoading ? (
              <div className="shop__spinner">
                <SyncLoader color="#df453e" margin={6} size={12} />
              </div>
            ) : (
              productList.map((product: ProductItem) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
