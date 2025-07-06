import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  About,
  Contact,
  ErrorPage,
  Home,
  ProductDetails,
  Shop,
  ShoppingCart,
  CheckoutPage,
} from '../pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage error={''} />,
    children: [
      {
        index: true, // Set this component as default homepage
        element: <Home />,
      },
      {
        path: 'product/:category/:id', // Product details - With product-id and category as a dynamic segments
        element: <ProductDetails />,
      },
      {
        path: 'product-category/:category', // Shopping page - With the category as a dynamic segment
        element: <Shop />,
      },
      {
        path: 'contact', // Contact page
        element: <Contact />,
      },
      {
        path: 'about', // About page
        element: <About />,
      },
      {
        path: 'cart', // Cart page
        element: <ShoppingCart />,
      },
      {
        path: 'checkout', // Checkout page
        element: <CheckoutPage />,
      },
    ],
  },
]);

export default router;
