import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, toggleCart } from '../features/cart/cartSlice';
import { RootState } from '../app/store';
import { IoCloseSharp, IoCloseCircleOutline } from 'react-icons/io5';

export default function CartPanel() {
  const isOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => dispatch(toggleCart())}
      />
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h5>Shopping Cart</h5>
          <div className="cart-header-close">
            <IoCloseSharp size={30} onClick={() => dispatch(toggleCart())} />
          </div>
        </div>
        <div className="cart-items">
          {items.map((item, index) => (
            <div key={index} className="cart-items__item-data">
              <div className="cart-item">
                <div className="cart-item__image">
                  <img src={item.image_url} alt={item.name} />
                </div>
                <div className="cart-item__text">
                  <div className="cart-item__name">
                    <p>{item.name}</p>
                    {item.size && <p>&nbsp;-&nbsp;{item.size}</p>}
                  </div>
                  <div className="cart-item__price">
                    <p>{item.quantity}</p>
                    <p>&nbsp;×&nbsp;€ {item.price}</p>
                  </div>
                </div>
              </div>
              <div>
                <IoCloseCircleOutline
                  className="cart-item__close-button"
                  size={30}
                  onClick={() =>
                    dispatch(removeFromCart({ id: item.id, size: item.size }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-panel__footer">
          <div className="cart-panel__footer__subtotal">
            <div className="cart-panel__footer__subtotal__label">Subtotal:</div>
            <div className="cart-panel__footer__subtotal__price">
              € {total.toFixed(2)}
            </div>
          </div>
          <button>VIEW CART</button>
          <button>CHECKOUT</button>
        </div>
      </div>
    </>
  );
}
