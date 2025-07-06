import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { ScrollToTop } from './utils/helperFunctions';
import { useLocation } from 'react-router-dom';
import './scss/style.scss';
import NavbarEmpty from './components/NavbarEmpty';

function App() {
  const location = useLocation();

  // Hide navbar when Checkout page is active
  const hideNavbarOnRoutes = ['/checkout'];
  const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar ? <Navbar /> : <NavbarEmpty />}
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
