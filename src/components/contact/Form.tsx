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

  // Do nothing on submit since it's a mock website
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
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form__name">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="First name"
          />

          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Last name"
          />
        </div>

        <div className="form__email">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email adress"
          />
        </div>

        <div className="form__message">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Message"
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
