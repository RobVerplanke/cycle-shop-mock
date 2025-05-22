import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { ProductItem } from '../types/Product';
import { Link, useParams } from 'react-router-dom';
import { capitalizeString } from '../utils/helperFunctions';
import { ProductCard } from '../components/ProductCard';
import CategoryOverview from '../components/shop/CategoryOverview';
import { useEffect } from 'react';
import { loadItems } from '../features/products/accessorySlice';

function ProductList() {
  // Determine the selected category from the url
  const { category } = useParams<{ category: string }>();

  const dispatch = useDispatch<AppDispatch>();

  // Collect the corresponding data
  const productList = useSelector((state: RootState) => {
    if (category === 'bicycles') return state.bicycles.productList;
    if (category === 'accessories') return state.accessories.productList;
    return [];
  });

  useEffect(() => {
    dispatch(loadItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="shop__product-container">
          <div className="shop__list-header">
            <div className="shop__header-results">
              {productList.length < 2 ? (
                <p>Showing the single result </p>
              ) : (
                <p>Showing all {productList.length} results</p>
              )}
            </div>
            <div className="shop__header-sort">
              <select>
                <option value="default">Default sorting</option>
              </select>
            </div>
          </div>
          <div className="shop__productlist">
            {productList.map((product: ProductItem) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
