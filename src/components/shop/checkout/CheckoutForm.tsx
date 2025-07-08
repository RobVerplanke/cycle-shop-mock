import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useEffect, useState } from 'react';

export default function CheckoutForm() {
  // Get cart items
  const items = useSelector((state: RootState) => state.cart.items);

  const [totalPrice, setTotalPrice] = useState(0);
  const [showMockMessage, setShowMockMessage] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowMockMessage(true);
  }

  // Calculate the total price
  useEffect(() => {
    const total = items.reduce(
      (acc, item) => (acc += Number(item.price) * item.quantity),
      0
    );
    setTotalPrice(total);
  }, [items]);

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="form-grid">
          <h5>Contact</h5>
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <h5>Billing Details</h5>

          <div className="form-group full-width">
            <label htmlFor="company">Company Name (Optional)</label>
            <input type="text" id="company" name="company" />
          </div>

          <div className="form-group full-width">
            <label htmlFor="country">Country / Region *</label>
            <select id="country" name="country" required>
              <option value="">Select a country…</option>
              <option value="NL">Netherlands</option>
              <option value="BE">Belgium</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="street">Street Address *</label>
            <input
              type="text"
              id="street"
              name="street"
              required
              placeholder="House number and street name"
            />
            <input
              type="text"
              name="apt"
              placeholder="Apartment, suite, unit etc. (optional)"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="postcode">Postcode / ZIP *</label>
            <input type="text" id="postcode" name="postcode" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="city">Town / City *</label>
            <input type="text" id="city" name="city" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="phone">Phone *</label>
            <input type="tel" id="phone" name="phone" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Order Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Notes about your order, e.g. special delivery instructions."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Your Order</h3>

        <div className="order-summary">
          <div className="order-row">
            <span>Product</span>
            <span>Total</span>
          </div>
          <br />
          {items.map((item, index) => (
            <div key={index} className="order-row">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>€{Number(item.price).toFixed(2)}</span>
            </div>
          ))}
          <br />

          <div className="order-row">
            <span>Shipping</span>
            <span>Free shipping</span>
          </div>
          <br />

          <div className="order-row total">
            <span>Total</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-methods">
          <label>
            <input type="radio" name="payment" value="ideal" defaultChecked />
            iDEAL
          </label>
          <label>
            <input type="radio" name="payment" value="paypal" />
            PayPal
          </label>
          <label>
            <input type="radio" name="payment" value="cod" />
            Cash on Delivery
          </label>
        </div>

        <button type="submit" className="place-order">
          Place Order
        </button>
      </div>
      {showMockMessage && (
        <p className="checkout-form__message">
          This is a mock webshop – your order was not actually placed.
        </p>
      )}
    </form>
  );
}
