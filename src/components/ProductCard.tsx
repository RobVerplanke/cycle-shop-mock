import { Bicycle, Accessory } from '../types/Product';

export function ProductCard({ product }: { product: Accessory | Bicycle }) {
  return (
    <div>
      <img src={product.image_url} alt={product.name} />
      <p>{product.type}</p>
      <p>{product.name}</p>
      {/* <p>{rating}</p> */}
      {/* <p>€{product.price}</p> */}
      {/* <p>{variants}</p> */}
    </div>
  );
}
