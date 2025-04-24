import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <p>logo</p>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/products'}>Shop</Link>
        </li>
        <li>
          <Link to={'/about'}>About us</Link>
        </li>
        <li>
          <Link to={'/contact'}>Contact</Link>
        </li>
        <li>
          <Link to={'/cart'}>Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
