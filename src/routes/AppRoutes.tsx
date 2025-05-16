import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  About,
  Contact,
  ErrorPage,
  Home,
  ProductDetail,
  Shop,
  Checkout,
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
        path: 'details/:id', // Product details - With the product-id as a dynamic segment
        element: <ProductDetail />,
      },
      {
        path: 'product-category/:category', // Shopping page - With the category as a dynamic segment
        element: <Shop />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
