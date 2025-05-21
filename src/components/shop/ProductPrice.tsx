import { ProductItem, Bicycle } from '../../types/Product';
import ProductPriceVariable from './ProductPriceVariable';

export default function productPrice({ product }: { product: ProductItem }) {
  // Typeguard to check if the product has a fixed price or a variable price
  function hasFixedPrice(product: ProductItem): product is Bicycle {
    return (product as Bicycle).price !== undefined;
  }

  // If a fixed price is available in the product data, display that price,
  // otherwise render the variable price component, which will display different prices
  return (
    <div className="price">
      {hasFixedPrice(product) ? (
        <div className="price__value">
          <div>€{product.price}</div>
        </div>
      ) : (
        <ProductPriceVariable product={product} />
      )}
    </div>
  );
}
