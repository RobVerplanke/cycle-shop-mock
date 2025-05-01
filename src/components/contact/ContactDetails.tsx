function ContactDetails() {
  return (
    <section className="details">
      <div className="details__title">
        <h3>Contact Details</h3>
      </div>
      <div className="details__hours">
        <div className="details__hours__title">
          <h5>Our Hours</h5>
        </div>
        <div className="details__hours__times">10:00 AM – 22.00 PM</div>
        <div className="details__hours__days">Monday – Friday</div>
      </div>
      <div className="details__location">
        <h5>Location</h5>
        <div className="details__location__adress">
          212 7th St SE, Washington, DC 20003, USA
        </div>
      </div>
      <div className="details__contact">
        <h5>Contact Us</h5>
        <div className="details__contact__phone">Phone: 1 800 755 60 20</div>
        <div className="details__contact__email">
          Email: contact@company.com
        </div>
      </div>
    </section>
  );
}

export default ContactDetails;
