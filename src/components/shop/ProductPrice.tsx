import { ProductItem, Bicycle } from '../../types/Product';
import { PriceVariants } from './';

export default function ProductPrice({ product }: { product: ProductItem }) {
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
          <div>€{product.price.toFixed(2)}</div>
        </div>
      ) : (
        <PriceVariants prices={product.prices} />
      )}
    </div>
  );
}
