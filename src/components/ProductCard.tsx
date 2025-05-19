import { Bicycle, Accessory } from '../types/Product';

export function ProductCard({ product }: { product: Accessory | Bicycle }) {
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
      {/* <p>{rating}</p> */}
      {/* <p>€{product.price}</p> */}
      {/* <p>{variants}</p> */}
    </div>
  );
}
