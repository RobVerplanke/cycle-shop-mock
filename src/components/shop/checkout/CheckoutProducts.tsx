import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CartItem } from '../../../types/Cart';
import { useEffect, useState } from 'react';

// A list with products from the cart, an option to apply a coupon code and the (sub)totals
export default function CheckoutProducts() {
  // Get cart items
  const items = useSelector((state: RootState) => state.cart.items);

  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the new total price
  useEffect(() => {
    const total = items.reduce(
      (acc, item) => (acc += Number(item.price) * item.quantity),
      0
    );
    setTotalPrice(total);
  }, [items]);

  return (
    <div className="checkout-products">
      {items.map((item: CartItem, index) => {
        return (
          <div className="checkout-products__container" key={index}>
            <div className="checkout-products__container__product">
              <div className="checkout-products__container__product__data">
                <div className="checkout-products__container__product__data__image">
                  <img src={item.image_url} alt="Product image" />
                  <span className="checkout-products__cart-badge">
                    {item.quantity}
                  </span>
                </div>
                <div className="checkout-products__container__product__data__name">
                  {item.name}
                  {item.size && <p>&nbsp;-&nbsp;{item.size}</p>}
                </div>
              </div>
              <div className="checkout-products__container__product__price">
                €{Number(item.price).toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
      <div className="cart-coupon">
        <div className="cart-coupon__input">
          <input type="text" placeholder="Coupon code" />
        </div>
        <div className="cart-coupon__button">
          <button>APPLY COUPON</button>
        </div>
      </div>
      <div className="checkout-products__container__subtotal">
        <div className="checkout-products__container__subtotal__text">
          Subtotal
        </div>
        <div className="checkout-products__container__subtotal__price">
          €{totalPrice}
        </div>
      </div>
      <div className="checkout-products__container__total">
        <div className="checkout-products__container__total__text">
          <strong>Total</strong>
        </div>
        <div className="checkout-products__container__total__price">
          <strong>€{totalPrice}</strong>
        </div>
      </div>
    </div>
  );
}
