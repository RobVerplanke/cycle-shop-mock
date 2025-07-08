import { Outlet, useLocation } from 'react-router-dom';
import { ScrollToTop } from './utils/helperFunctions';
import NavbarEmpty from './components/NavbarEmpty';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './scss/style.scss';

function App() {
  const location = useLocation();

  // Hide navbar when Checkout page is active
  const hideNavbarOnRoutes = ['/checkout'];
  const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <div className="page">
      {shouldShowNavbar ? <Navbar /> : <NavbarEmpty />}
      <ScrollToTop />
      <main className="page__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
