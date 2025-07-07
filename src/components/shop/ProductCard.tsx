import { ProductItem } from '../../types/Product';
import { ProductPrice, ProductRating } from './';
import { Link } from 'react-router-dom';

// Product card
export default function ProductCard({ product }: { product: ProductItem }) {
  return (
    <article className="card" aria-labelledby={`product-title-${product.id}`}>
      <div className="card__thumbnail">
        <img src={product.image_url} alt={`Afbeelding van ${product.name}`} />
      </div>

      <div className="card__type">
        <p>{product.type}</p>
      </div>

      <div className="card__name">
        <h6 id={`product-title-${product.id}`}>
          <Link
            to={`/product/${product.type}/${product.id}`}
            state={{ product }}
            aria-label={`Bekijk productpagina van ${product.name}`}
          >
            {product.name}
          </Link>
        </h6>
      </div>

      <div>
        <ProductRating product={product} />
      </div>

      <div className="card__price">
        <ProductPrice product={product} />
      </div>
    </article>
  );
}
