import { ProductItem } from '../types/Product';
import ProductPrice from './shop/ProductPrice';
import ProductRating from './shop/ProductRating';

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
        <h6>{product.name}</h6>
      </div>
      <div>
        <ProductRating id={product.id} type={product.type} />
      </div>
      <div className="card__price">
        <ProductPrice product={product} />
      </div>
      {/* <p>{variants}</p> */}
    </div>
  );
}
