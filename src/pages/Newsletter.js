// src/components/Newsletter.js
import React, { useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL; // Ensure your API URL is set in .env

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        const response = await axios.post(`${apiUrl}sendingEmail/send-email`, {
          to: 'nandeeshyadav2@gmail.com',
          subject: 'Newsletter Subscription',
          text: `New subscription from: ${email}`,
          html: `<h1>New subscription from: ${email}</h1>`,
        });

        if (response.status === 200) {
          setMessage('Thank you for subscribing!');
          setEmail(''); // Clear the input field
        } else {
          setMessage('Something went wrong. Please try again later.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setMessage('Error sending subscription. Please try again.');
      }
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
