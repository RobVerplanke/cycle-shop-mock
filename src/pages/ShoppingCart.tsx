import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { CartItem } from '../types/CartItem';

function ProductList() {
  const cartList = useSelector((state: RootState) => state.cart.cartList);

  return (
    <div>
      <h1>Shopping cart</h1>
      {cartList.map((cartItem: CartItem) => {
        return <div key={cartItem.id}>{cartItem.name}</div>;
      })}
    </div>
  );
}

export default ProductList;
