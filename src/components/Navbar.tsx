import { Link } from 'react-router-dom';
import { MdPedalBike } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { IoCart } from 'react-icons/io5';
import { useState } from 'react';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Toggle menu hamburger icon, make menu visible if screen width becomes larger
  function toggleMenu() {
    setIsNavOpen(!isNavOpen);
    setIsNavVisible(!isNavVisible);
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <MdPedalBike size={70} />
        </div>

        <div
          className="navbar__menu-icon"
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
        >
          {isNavOpen ? <IoClose size={40} /> : <IoMenu size={40} />}
        </div>

        <ul className={isNavVisible ? 'navbar__menu--open' : 'navbar__menu'}>
          <li className="navbar__item">
            <Link to="/">HOME</Link>
          </li>
          <li className="navbar__item">
            <Link to="/products">BICYCLES</Link>
          </li>
          <li className="navbar__item">
            <Link to="/products">ACCESSOIRES</Link>
          </li>
          <li className="navbar__item">
            <Link to="/about">ABOUT US</Link>
          </li>
          <li className="navbar__item">
            <Link to="/contact">CONTACT</Link>
          </li>
        </ul>

        <div className="navbar__cart-icon">
          <Link to="/cart">
            <IoCart size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
