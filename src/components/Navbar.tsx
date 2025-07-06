import { Link, useLocation } from 'react-router-dom';
import { MdPedalBike } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { IoCart } from 'react-icons/io5';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toggleCart } from '../features/cart/cartSlice';
import CartPanel from './CartPanel';

function Navbar() {
  // States
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Make header for the Homepage, Aboutpage and Contactpage transparent
  const location = useLocation();
  const path = location.pathname;
  const transparentPaths = ['/', '/about', '/contact'];
  const isTransparent = transparentPaths.includes(path);

  // Get the amount of items in the cart
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // Toggle menu hamburger icon, make menu visible if screen width becomes larger
  function toggleMenu() {
    setIsNavOpen(!isNavOpen);
    setIsNavVisible(!isNavVisible);
  }

  return (
    <nav className={isTransparent ? 'navbar_transparent' : 'navbar_red'}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to="/">
            <MdPedalBike size={70} />
          </Link>
        </div>

        <div
          className="navbar__menu-icon"
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
        >
          {isNavOpen ? <IoClose size={25} /> : <IoMenu size={25} />}
        </div>

        <ul className={isNavVisible ? 'navbar__menu--open' : 'navbar__menu'}>
          <li className="navbar__item">
            <Link to="/">HOME</Link>
          </li>
          <li className="navbar__item">
            <Link to="/product-category/bicycles">BICYCLES</Link>
          </li>
          <li className="navbar__item">
            <Link to="/product-category/accessories">ACCESSOIRIES</Link>
          </li>
          <li className="navbar__item">
            <Link to="/about">ABOUT US</Link>
          </li>
          <li className="navbar__item">
            <Link to="/contact">CONTACT</Link>
          </li>
        </ul>

        <div
          className="navbar__cart-button"
          onClick={() => dispatch(toggleCart())}
          role="button"
          tabIndex={0}
        >
          <span className="navbar__cart-total">€ {total.toFixed(2)}</span>
          <IoCart size={24} />
          {items.length > 0 && (
            <span className="navbar__cart-badge">{items.length}</span>
          )}
        </div>
      </div>
      <>
        <CartPanel />
      </>
    </nav>
  );
}

export default Navbar;
