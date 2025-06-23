import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { ProductItem } from '../types/Product';

// Convert the rating (number) to the corresponding amount of stars
export default function ProductRating({ product }: { product: ProductItem }) {
  const fullStars = Math.ceil(product.avg_rating);

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) =>
        i < fullStars ? (
          <FaStar key={i} fontSize="medium" />
        ) : (
          <FaRegStar key={i} fontSize="medium" />
        )
      )}
    </div>
  );
}
