import { SiTarget } from 'react-icons/si';

function Header() {
  return (
    <header className="header">
      <div className="header__overlay">
        <div className="header__overlay__left-column"></div>
        <div className="header__overlay__right-column"></div>
      </div>

      <div className="header__container">
        <div className="header__title">
          <h2>Newly Launched</h2>
        </div>
        <div className="header__subtitle">
          <h1>Kryo X26 MTB</h1>
        </div>
        <div className="header__specs-container">
          <div className="header__specs__title">
            <h2>Specifications:</h2>
          </div>
          <div className="header__specs">
            <ul className="header__list">
              <li className="header__list-item">
                <div>
                  <SiTarget />
                </div>
                <div className="header__list-item__content">
                  Lightweight 18" Frame
                </div>
              </li>
              <li className="header__list-item">
                <div>
                  <SiTarget />
                </div>
                <div className="header__list-item__content">
                  Steel Suspension Fork
                </div>
              </li>
              <li className="header__list-item">
                <div>
                  <SiTarget />
                </div>
                <div className="header__list-item__content">
                  Steel Hardtail Frame
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="header__buy-button">
          <button>BUY NOW</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
