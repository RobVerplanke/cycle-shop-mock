import ContactDetails from '../components/contact/ContactDetails';
import ContactForm from '../components/contact/Form';
import GoogleMap from '../components/contact/GoogleMap';
import Header from '../components/contact/Header';
import Telephone from '../components/contact/Telephone';

function Contact() {
  return (
    <div>
      <Header />
      <GoogleMap />
      <Telephone />
      <div className="contact-details">
        <ContactForm />
        <ContactDetails />
      </div>
    </div>
  );
}
export default Contact;
