import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { Link, useParams } from 'react-router-dom';
import { capitalizeString } from '../utils/helperFunctions';
import { ProductCard } from '../components/ProductCard';
import CategoryOverview from '../components/shop/CategoryOverview';
import { useEffect, useRef, useState } from 'react';
import { ProductItem, ShopCategories } from '../types/Product';
import ProductListHeader from '../components/shop/ProductListHeader';
import { SyncLoader } from 'react-spinners';
import { loadReviews } from '../features/reviews/reviewSlice';
import PriceFilter from '../components/shop/PriceFilter';
import { loadProducts } from '../features/products/productSlice';
import { SortingOptions } from '../types/SortingOptions';

function ProductList() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log('Render count:', renderCount.current);
  const dispatch = useDispatch<AppDispatch>();

  // Determine the selected category from the url
  const { category } = useParams<{ category: ShopCategories }>();

  // Get acces to the price variants from all products in the 'accessories' category
  const variantsList = useSelector(
    (state: RootState) => state.variants.variants
  );

  // Get a list of all products in the active category
  const productList = useSelector((state: RootState) =>
    category ? state.products.productList[category] : []
  );

  // Get loading status that determines whether to show a short message while the data is loading or not
  const isLoading = useSelector((state: RootState) => state.products.loading);

  // Keep track of the active sorting option
  const [sortingOption, setSortingOption] = useState<SortingOptions>('default');

  // Load the rating (stars) for each product
  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  // Initially load all products to determine the amount of products in each category to keep the
  // counters in 'filter by categories' up-to-date
  useEffect(() => {
    dispatch(loadProducts({ sortingOption, category: 'bicycles' }));
    dispatch(loadProducts({ sortingOption, category: 'accessories' }));
  }, [dispatch, sortingOption]);

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
          <PriceFilter
            category={category}
            productList={productList}
            variantsList={variantsList}
          />
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
