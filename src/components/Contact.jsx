import { useContact } from '../hooks/useContact';
import './Contact.css';

const Contact = ({ phoneNumber, whatsappNumber, email }) => {
  const { callPhone, openWhatsApp } = useContact(phoneNumber, whatsappNumber);

  return (
    <section className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-options">
          {phoneNumber && (
            <button onClick={callPhone} className="contact-button phone">
              <span className="contact-icon">📞</span>
              <span className="contact-text">Call Me</span>
            </button>
          )}
          {whatsappNumber && (
            <button
              onClick={() => openWhatsApp('Hello! I came across your CV and would like to connect.')}
              className="contact-button whatsapp"
            >
              <span className="contact-icon">💬</span>
              <span className="contact-text">WhatsApp</span>
            </button>
          )}
          {email && (
            <a href={`mailto:${email}`} className="contact-button email">
              <span className="contact-icon">📧</span>
              <span className="contact-text">Email Me</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
