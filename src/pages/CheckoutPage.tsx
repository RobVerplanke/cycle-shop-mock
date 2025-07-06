import CheckoutForm from '../components/shop/checkout/CheckoutForm';
import CheckoutProducts from '../components/shop/checkout/CheckoutProducts';

function CheckoutPage() {
  return (
    <div className="checkout-page">
      <CheckoutForm />
      <CheckoutProducts />
    </div>
  );
}

export default CheckoutPage;
