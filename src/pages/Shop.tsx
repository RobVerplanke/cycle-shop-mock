import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Accessory, Bicycle } from '../types/Product';
import { useParams } from 'react-router-dom';

function ProductList() {
  // Determine the selected category from the url
  const { category } = useParams<{ category: string }>();

  // Collect the corresponding data
  const productList = useSelector((state: RootState) => {
    if (category === 'bicycles') return state.bicycles.productList;
    if (category === 'accessories') return state.accessories.productList;
    return [];
  });

  return (
    <div className="shop">
      <aside className="shop__aside">
        <div className="shop__search-container">
          <div className="shop__search-title">Search</div>
          <div className="shop__search-form">
            <input type="text" />
            <button type="submit">SEARCH</button>
          </div>
        </div>
        <div className="shop__filter-price">
          <h5>Filter by price</h5>
        </div>
        <div className="shop__filter-category">
          <h5>Filter by categories</h5>
        </div>
        <div className="shop__recently">
          <h5>Recently viewed products</h5>
        </div>
      </aside>
      <main className="shop__right">
        <div className="shop__breadcrumb">{/* Breadcrumb module here */}</div>
        <div className="shop__title">
          <h2>{category}</h2>
        </div>
        <div className="shop__product-container">
          <div className="shop__list-header">
            <div className="shop__header-results">Showing x results</div>
            <div className="shop__header-sort">
              <select />
            </div>
          </div>
          <div className="shop__productlist">
            {productList.map((product: Accessory | Bicycle) => {
              return <div key={product.id}>{product.name}</div>;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
