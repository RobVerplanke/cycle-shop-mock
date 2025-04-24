import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  About,
  Contact,
  ErrorPage,
  Home,
  ProductDetail,
  ProductList,
  ShoppingCart,
} from '../pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage error={''} />,
    children: [
      {
        index: true, // Set this page as default "Homepage"
        element: <Home />,
      },
      {
        path: 'details/:id', // Depends on the id of the product
        element: <ProductDetail />,
      },
      {
        path: 'products', // Depends on the category (bikes or accessoires)
        element: <ProductList />,
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
        path: 'cart',
        element: <ShoppingCart />,
      },
    ],
  },
]);

export default router;
