import { useState } from 'react';
import { FiMail, FiSend, FiMapPin, FiPhone, FiClock, FiCheckCircle } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    // Enforce letters-only names and Gmail-only emails.
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      setError('Please use a valid @gmail.com email address');
      return;
    }
    if (name.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (!nameRegex.test(name)) {
      setError('Name must contain only letters and spaces');
      return;
    }
    if (formData.message.trim().length < 10) {
      setError('Message must be at least 10 characters');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact page">
      <h1>Contact Us</h1>
      <p className="subtitle">Have questions? We'd love to hear from you!</p>

      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form-section card">
          <h2>Send us a Message</h2>
          
          {submitted && (
            <div className="success-message">
              <FiCheckCircle style={{ marginRight: '8px' }} />
              <strong>Acknowledgement:</strong><br />
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {error && (
            <div className="error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address (Only @gmail.com accepted)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                required
              />
            </div>

            <button type="submit" className="submit-btn btn">
              <FiSend style={{ marginRight: '8px' }} /> Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info-section card">
          <h2>Get in Touch</h2>
          
          <div className="info-cards">
            <div className="info-card">
              <span className="info-icon"><FiMapPin /></span>
              <h3>Address</h3>
              <p>Bharath Matha First Grade College<br/>Koppa, Periyapatna Taluk<br/>Mysore - 571107</p>
            </div>

            <div className="info-card">
              <span className="info-icon"><FiMail /></span>
              <h3>Email</h3>
              <p>info@studyseekers.in<br/>support@studyseekers.in</p>
            </div>

            <div className="info-card">
              <span className="info-icon"><FiPhone /></span>
              <h3>Phone</h3>
              <p>+91 98765 43210<br/>+91 12345 67890</p>
            </div>

            <div className="info-card">
              <span className="info-icon"><FiClock /></span>
              <h3>Working Hours</h3>
              <p>Monday - Friday<br/>9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
