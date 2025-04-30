import { MdPedalBike } from 'react-icons/md';
import { IoLogoFacebook } from 'react-icons/io5';
import { IoLogoTwitter } from 'react-icons/io5';
import { IoLogoInstagram } from 'react-icons/io5';
import { IoLogoYoutube } from 'react-icons/io5';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__logo">
          <MdPedalBike size={90} />
        </div>
        <div className="footer__link-list">
          <div className="footer__list-title">
            <h5>Usefull Links</h5>
          </div>
          <div className="footer_list">
            <div className="footer__link">Home</div>
            <div className="footer__link">Shop</div>
            <div className="footer__link">About Us</div>
            <div className="footer__link">Contact Us</div>
          </div>
        </div>
        <div className="footer__link-list">
          <div className="footer__list-title">
            <h5>Our Collection</h5>
          </div>
          <div className="footer_list">
            <div className="footer__link">Mountain Bikes</div>
            <div className="footer__link">City Bikes</div>
            <div className="footer__link">Speciality Bikes</div>
            <div className="footer__link">Electric Bikes</div>
          </div>
        </div>
        <div className="footer__link-list">
          <div className="footer__list-title">
            <h5>Account</h5>
          </div>
          <div className="footer_list">
            <div className="footer__link">Customer Login</div>
            <div className="footer__link">Dealer Login</div>
            <div className="footer__link">Addresses</div>
            <div className="footer__link">Payment Methods</div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__copyright">
          <p>Copyright © 2025 Cycle Shop</p>
        </div>
        <div className="footer__socials">
          <div className="social-link">
            <IoLogoFacebook />
          </div>
          <div className="social-link">
            <IoLogoTwitter />
          </div>
          <div className="social-link">
            <IoLogoInstagram />
          </div>
          <div className="social-link">
            <IoLogoYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
