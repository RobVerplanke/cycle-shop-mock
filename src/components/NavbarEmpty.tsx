import { Link } from 'react-router-dom';
import { MdPedalBike } from 'react-icons/md';

// Empty navbar replaces navigation when checkout page is active
function NavbarEmpty() {
  return (
    <nav>
      <div className="navbar-empty">
        <div className="navbar-empty__logo">
          <Link to="/">
            <MdPedalBike size={70} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarEmpty;
