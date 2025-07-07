import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, toggleCart } from '../features/cart/cartSlice';
import { RootState } from '../app/store';
import { IoCloseSharp, IoCloseCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function CartPanel() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const isOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => dispatch(toggleCart())}
        aria-hidden="true"
      />

      {/* Cart Panel */}
      <aside
        className={`cart-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="cart-header">
          <h4 id="cart-title">Shopping Cart</h4>
          <button
            className="cart-header-close"
            onClick={() => dispatch(toggleCart())}
            aria-label="Close shopping cart"
          >
            <IoCloseSharp size={30} aria-hidden="true" />
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-items__empty">
              <p>No products in the cart.</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="cart-items__item-data">
                <div className="cart-item">
                  <div className="cart-item__image">
                    <img
                      src={item.image_url}
                      alt={`Product image of ${item.name}`}
                    />
                  </div>
                  <div className="cart-item__text">
                    <div className="cart-item__name">
                      <Link
                        to={`/product/${item.type}/${item.id}`}
                        onClick={() => dispatch(toggleCart())}
                        state={{ product: item }}
                        aria-label={`View details of ${item.name}`}
                      >
                        {item.name}
                      </Link>
                      {item.size && <p> – {item.size}</p>}
                    </div>
                    <div className="cart-item__price">
                      <p>{item.quantity}</p>
                      <p>&nbsp;×&nbsp;€ {item.price}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="cart-item__close-button"
                  onClick={() =>
                    dispatch(removeFromCart({ id: item.id, size: item.size }))
                  }
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <IoCloseCircleOutline size={30} aria-hidden="true" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cart-panel__footer">
          {items.length > 0 && (
            <div className="cart-panel__footer__subtotal">
              <div className="cart-panel__footer__subtotal__label">
                Subtotal:
              </div>
              <div className="cart-panel__footer__subtotal__price">
                € {total.toFixed(2)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="cart-panel__footer__buttons">
            {items.length === 0 ? (
              <Link to="/product-category/accessories">
                <button onClick={() => dispatch(toggleCart())}>
                  Continue Shopping
                </button>
              </Link>
            ) : (
              <>
                <Link to="/cart">
                  <button onClick={() => dispatch(toggleCart())}>
                    View Cart
                  </button>
                </Link>
                <Link to="/checkout">
                  <button onClick={() => dispatch(toggleCart())}>
                    Checkout
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
