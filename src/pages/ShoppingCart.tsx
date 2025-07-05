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

  // Get all cart items
  const items = useSelector((state: RootState) => state.cart.items);

  // State
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Update total price after click on 'UPDATE CART'-button
  const handleClick = () => {
    Object.entries(quantities).forEach(([key, quantity]) => {
      const [idStr, size] = key.split('-');
      const id = Number(idStr);
      dispatch(updateQuantity({ id, size: size || undefined, quantity }));
    });
  };

  // Keep track of quantity values for each product
  useEffect(() => {
    const initialQuantities = items.reduce((acc, item) => {
      const key = `${item.id}-${item.size ?? ''}`;
      acc[key] = item.quantity;
      return acc;
    }, {} as { [key: string]: number });
    setQuantities(initialQuantities);
  }, [items]);

  // Calculate the new total price when items are changed/removed
  useEffect(() => {
    const total = items.reduce(
      (acc, item) => (acc += Number(item.price) * item.quantity),
      0
    );
    setTotalPrice(total);
  }, [items]);

  return (
    <div className="page-holder">
      <div className="table-container">
        <div className="cart">
          <h5>Cart</h5>
          <br />
          <div className="cart__items">
            <table className="cart__items__table">
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
                  return (
                    <tr key={index}>
                      <td>
                        <IoCloseCircleOutline
                          className="cart-item__close-button"
                          size={30}
                          onClick={() =>
                            dispatch(
                              removeFromCart({ id: item.id, size: item.size })
                            )
                          }
                        />
                      </td>
                      <td id="cart-product-image">
                        <img src={item.image_url} alt="Product image" />
                      </td>
                      <td>
                        <div className="cart-product-name">
                          <Link
                            to={`/product/${item.type}/${item.id}`}
                            state={{ product: item }}
                          >
                            {item.name}
                          </Link>
                          {item.size && <p>&nbsp;-&nbsp;{item.size}</p>}
                        </div>
                      </td>
                      <td>€{Number(item.price).toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          inputMode="numeric"
                          value={quantities[key] ?? item.quantity}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [key]: Number(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        €
                        {calculateSubTotal(
                          item.price,
                          quantities[key] ?? item.quantity
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={4}>
                    <div className="cart-coupon">
                      <div className="cart-coupon__input">
                        <input type="text" placeholder="Coupon code" />
                      </div>
                      <div className="cart-coupon__button">
                        <button>APPLY COUPON</button>
                      </div>
                    </div>
                  </td>
                  <td colSpan={2}>
                    <div className="cart-update">
                      <div className="cart-update__button">
                        <button onClick={handleClick}>UPDATE CART</button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="subtotals">
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
                      <button>PROCEED TO CHECKOUT</button>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
