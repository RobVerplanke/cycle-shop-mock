import { GiConfirmed } from 'react-icons/gi';
import { Link } from 'react-router-dom';

// Confirm message, shown at the top og the page when a product is added to the cart succesfully
export default function ConfirmAddToCart({ name }: { name: string }) {
  return (
    <div className="confirm-message">
      <div className="confirm-message__text">
        <GiConfirmed />"{name}" has been added to your cart
      </div>
      <div className="confirm-message__button">
        <Link to={`/cart`}>
          <button>VIEW CART</button>
        </Link>
      </div>
    </div>
  );
}
