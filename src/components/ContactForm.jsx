// src/components/ContactForm.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const hasEnv = () => (
  !!process.env.REACT_APP_EMAILJS_SERVICE_ID &&
  !!process.env.REACT_APP_EMAILJS_TEMPLATE_ID &&
  !!process.env.REACT_APP_EMAILJS_USER_ID
);

const ContactForm = ({ compact = false, onSent }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setSending(true);

    if (hasEnv()) {
      try {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          formData,
          process.env.REACT_APP_EMAILJS_USER_ID
        );
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        onSent && onSent();
      } catch (err) {
        setStatus('Failed to send message, please try again.');
      } finally {
        setSending(false);
      }
    } else {
      // Fallback: open mail client if EmailJS is not configured
      const mailto = `mailto:khoitran590@gmail.com?subject=Portfolio%20message%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nfrom: ' + formData.email)}`;
      window.location.href = mailto;
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="w-full px-4 py-3 rounded-full border border-black/5 dark:border-white/10 bg-white/90 dark:bg-gray-800/60 supports-[backdrop-filter]:backdrop-blur text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          required
          className="w-full px-4 py-3 rounded-full border border-black/5 dark:border-white/10 bg-white/90 dark:bg-gray-800/60 supports-[backdrop-filter]:backdrop-blur text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
      </div>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={compact ? 3 : 5}
        placeholder="Write your message..."
        required
        className="w-full px-4 py-3 rounded-2xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-gray-800/60 supports-[backdrop-filter]:backdrop-blur text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
      />
      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Send Message'}
        </button>
        {status && (
          <span className="text-sm text-gray-600 dark:text-gray-300">{status}</span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
