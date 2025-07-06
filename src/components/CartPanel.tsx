import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, toggleCart } from '../features/cart/cartSlice';
import { RootState } from '../app/store';
import { IoCloseSharp, IoCloseCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function CartPanel() {
  const dispatch = useDispatch();

  // Get cart items and a open/close state for the side panel
  const items = useSelector((state: RootState) => state.cart.items);
  const isOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  // Calculate the total of the subtotals, shown as 'Subtotal' at the bottom of the panel
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
          {!items.length ? (
            <div className="cart-items__empty">
              <p>No products in the cart.</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="cart-items__item-data">
                <div className="cart-item">
                  <div className="cart-item__image">
                    <img src={item.image_url} alt={item.name} />
                  </div>
                  <div className="cart-item__text">
                    <div className="cart-item__name">
                      <Link
                        to={`/product/${item.type}/${item.id}`}
                        onClick={() => dispatch(toggleCart())}
                        state={{ product: item }}
                      >
                        {item.name}
                      </Link>
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
            ))
          )}
        </div>
        <div className="cart-panel__footer">
          <div className="cart-panel__footer__subtotal">
            {items.length !== 0 && (
              <>
                <div className="cart-panel__footer__subtotal__label">
                  Subtotal:
                </div>
                <div className="cart-panel__footer__subtotal__price">
                  € {total.toFixed(2)}
                </div>
              </>
            )}
          </div>
          <div className="cart-panel__footer__buttons">
            {!items.length ? (
              <div>
                <Link to="/product-category/accessories">
                  <button onClick={() => dispatch(toggleCart())}>
                    CONTINUE SHOPPING
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <Link to="/cart">
                    <button onClick={() => dispatch(toggleCart())}>
                      VIEW CART
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/checkout">
                    <button onClick={() => dispatch(toggleCart())}>
                      CHECKOUT
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
