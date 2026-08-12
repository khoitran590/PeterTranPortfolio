// src/components/ContactForm.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const DIRECT_EMAIL = 'khoitran590@gmail.com';

const hasEnv = () => (
  !!process.env.REACT_APP_EMAILJS_SERVICE_ID &&
  !!process.env.REACT_APP_EMAILJS_TEMPLATE_ID &&
  !!process.env.REACT_APP_EMAILJS_USER_ID
);

const ContactForm = ({ compact = false, onSent }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const isConfigured = hasEnv();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setSending(true);

    if (isConfigured) {
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
      } catch {
        setStatus('Failed to send message, please try again.');
      } finally {
        setSending(false);
      }
    } else {
      setStatus('Opening your email app…');
      const mailto = `mailto:${DIRECT_EMAIL}?subject=Portfolio%20message%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nfrom: ' + formData.email)}`;
      window.location.href = mailto;
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="contact-form-note">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="sr-only" htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            required
            className="w-full px-4 py-3 rounded-full border border-black/5 dark:border-white/10 bg-white/90 dark:bg-gray-800/60 supports-[backdrop-filter]:backdrop-blur text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            autoComplete="email"
            required
            className="w-full px-4 py-3 rounded-full border border-black/5 dark:border-white/10 bg-white/90 dark:bg-gray-800/60 supports-[backdrop-filter]:backdrop-blur text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
      </div>
      <div>
        <label className="sr-only" htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={compact ? 3 : 5}
          placeholder="Write your message..."
          required
          className="w-full px-4 py-3 rounded-2xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-gray-800/60 supports-[backdrop-filter]:backdrop-blur text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Send Message'}
        </button>
        {status && (
          <span role="status" aria-live="polite" className="text-sm text-gray-600 dark:text-gray-300">{status}</span>
        )}
      </div>
      <p id="contact-form-note" className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {!isConfigured ? (
          <>Submitting opens your email app. Prefer a direct link? <a href={`mailto:${DIRECT_EMAIL}`} className="font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-950 dark:text-gray-200 dark:hover:text-white">{DIRECT_EMAIL}</a></>
        ) : 'I’ll respond to your message as soon as I can.'}
      </p>
    </form>
  );
};

export default ContactForm;
