import { useState } from 'react';
import ContactFormConfirm from './FormConfirm';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ContactFormConfirm />;
  }

  return (
    <div className="form">
      <div className="form__title">
        <h3>Let's Get in Touch</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="contact-form"
        aria-labelledby="contact-form-title"
      >
        <legend id="contact-form-title" className="visually-hidden">
          Contact Form
        </legend>

        <div className="form__name">
          <div className="form__field">
            <label htmlFor="firstName" className="visually-hidden">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              aria-required="true"
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="lastName" className="visually-hidden">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              aria-required="true"
              required
            />
          </div>
        </div>

        <div className="form__email form__field">
          <label htmlFor="email" className="visually-hidden">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            aria-required="true"
            required
          />
        </div>

        <div className="form__message form__field">
          <label htmlFor="message" className="visually-hidden">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Message"
            aria-required="true"
          />
        </div>

        <div className="form__button">
          <button type="submit">Send message</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
