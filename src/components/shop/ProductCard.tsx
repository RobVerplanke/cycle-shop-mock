import { ProductItem } from '../../types/Product';
import ProductRating from './ProductRating';
import ProductPrice from './ProductPrice';
import { Link } from 'react-router-dom';

// Product card
export function ProductCard({ product }: { product: ProductItem }) {
  return (
    <div className="card">
      <div className="card__thumbnail">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="card__type">
        <p>{product.type}</p>
      </div>
      <div className="card__name">
        <Link to={`/product/${product.type}/${product.id}`} state={{ product }}>
          <h6>{product.name}</h6>
        </Link>
      </div>
      <div>
        <ProductRating product={product} />
      </div>
      <div className="card__price">
        <ProductPrice product={product} />
      </div>
    </div>
  );
}
