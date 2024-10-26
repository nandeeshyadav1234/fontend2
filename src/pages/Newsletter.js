// src/components/Newsletter.js
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email) {
      // Here, you would typically send the email to your server or a newsletter service.
      setMessage('Thank you for subscribing!');
      setEmail(''); // Clear the input field
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <section className="newsletter-section ftco-section-parallax">
      <div className="container text-center">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay updated with the latest news and offers.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="newsletter-input"
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
        {message && <p className="newsletter-message">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
