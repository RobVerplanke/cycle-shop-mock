function ContactDetails() {
  return (
    <div className="details">
      <div className="details__title">
        <h3>Contact Details</h3>
      </div>
      <div className="details__hours">
        <div className="details__hours__title">
          <h2>Our Hours</h2>
        </div>
        <div className="details__hours__times">10:00 AM – 22.00 PM</div>
        <div className="details__hours__days">Monday – Friday</div>
      </div>
      <div className="details__location">
        <h2>Location</h2>
        <div className="details__location__adress">
          212 7th St SE, Washington, DC 20003, USA
        </div>
      </div>
      <div className="details__contact">
        <h2>Contact Us</h2>
        <div className="details__contact__phone">Phone: 1 800 755 60 20</div>
        <div className="details__contact__email">
          Email: contact@company.com
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
