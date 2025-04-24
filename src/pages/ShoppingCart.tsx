import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { CartItem } from '../types/CartItem';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const cartList = useSelector((state: RootState) => state.cart.cartList);

  return (
    <div>
      <h1>Shopping cart</h1>
      {cartList.map((cartItem: CartItem) => {
        return <div key={cartItem.id}>{cartItem.name}</div>;
      })}
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}

export default ShoppingCart;
