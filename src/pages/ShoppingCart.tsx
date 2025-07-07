import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { CartItem } from '../types/Cart';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { useEffect, useState } from 'react';
import { calculateSubTotal } from '../utils/helperFunctions';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialQuantities = items.reduce((acc, item) => {
      const key = `${item.id}-${item.size ?? ''}`;
      acc[key] = item.quantity;
      return acc;
    }, {} as { [key: string]: number });
    setQuantities(initialQuantities);
  }, [items]);

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [items]);

  const handleClick = () => {
    Object.entries(quantities).forEach(([key, quantity]) => {
      const [idStr, size] = key.split('-');
      const id = Number(idStr);
      dispatch(updateQuantity({ id, size: size || undefined, quantity }));
    });
  };

  return (
    <div className="page-holder">
      <div className="table-container">
        {items.length === 0 ? (
          <p role="status">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="cart">
              <h5 id="cart-heading">Cart</h5>
              <br />
              <div
                className="cart__items"
                role="region"
                aria-labelledby="cart-heading"
              >
                <table className="cart__items__table">
                  <caption className="sr-only">
                    Items in your shopping cart
                  </caption>
                  <thead>
                    <tr>
                      <th>Remove</th>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: CartItem, index) => {
                      const key = `${item.id}-${item.size ?? ''}`;
                      const quantity = quantities[key] ?? item.quantity;
                      return (
                        <tr key={index}>
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  removeFromCart({
                                    id: item.id,
                                    size: item.size,
                                  })
                                )
                              }
                              className="cart-item__close-button"
                              aria-label={`Remove ${item.name}${
                                item.size ? `, size ${item.size}` : ''
                              }`}
                            >
                              <IoCloseCircleOutline
                                size={30}
                                aria-hidden="true"
                              />
                            </button>
                          </td>
                          <td id="cart-product-image">
                            <img
                              src={item.image_url}
                              alt={`Image of ${item.name}`}
                            />
                          </td>
                          <td>
                            <div className="cart-product-name">
                              <Link
                                to={`/product/${item.type}/${item.id}`}
                                state={{ product: item }}
                                aria-label={`View details for ${item.name}`}
                              >
                                {item.name}
                              </Link>
                              {item.size && <p>&nbsp;-&nbsp;{item.size}</p>}
                            </div>
                          </td>
                          <td>€{Number(item.price).toFixed(2)}</td>
                          <td>
                            <label
                              htmlFor={`quantity-${key}`}
                              className="sr-only"
                            >
                              Quantity for {item.name}
                            </label>
                            <input
                              id={`quantity-${key}`}
                              type="number"
                              min="1"
                              step="1"
                              inputMode="numeric"
                              value={quantity}
                              onChange={(e) =>
                                setQuantities({
                                  ...quantities,
                                  [key]: Number(e.target.value),
                                })
                              }
                            />
                          </td>
                          <td>€{calculateSubTotal(item.price, quantity)}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan={4}>
                        <div className="cart-coupon">
                          <div className="cart-coupon__input">
                            <label htmlFor="coupon" className="sr-only">
                              Coupon code
                            </label>
                            <input
                              id="coupon"
                              type="text"
                              placeholder="Coupon code"
                            />
                          </div>
                          <div className="cart-coupon__button">
                            <button type="button">APPLY COUPON</button>
                          </div>
                        </div>
                      </td>
                      <td colSpan={2}>
                        <div className="cart-update">
                          <div className="cart-update__button">
                            <button type="button" onClick={handleClick}>
                              UPDATE CART
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="subtotals" role="region" aria-label="Cart totals">
              <table className="subtotals__table">
                <thead>
                  <tr>
                    <th>
                      <h5>Cart Totals</h5>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>€{totalPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>€{totalPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="subtotals__table__proceed">
                        <Link to="/checkout">
                          <button type="button">PROCEED TO CHECKOUT</button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
