// src/components/ContactForm.jsx
import React, { useId, useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const DIRECT_EMAIL = 'khoitran590@gmail.com';

const hasEnv = () => (
  !!process.env.REACT_APP_EMAILJS_SERVICE_ID &&
  !!process.env.REACT_APP_EMAILJS_TEMPLATE_ID &&
  !!process.env.REACT_APP_EMAILJS_USER_ID
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Messages say what is wrong and what to do about it, rather than "invalid input".
const validate = ({ name, email, message }) => {
  const errors = {};
  if (!name.trim()) errors.name = 'Add your name so I know who I am replying to.';
  if (!email.trim()) errors.email = 'Add an email address so I can reply.';
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'That address is missing an @ or a domain.';
  if (!message.trim()) errors.message = 'Add a short message.';
  else if (message.trim().length < 10) errors.message = 'A little more detail helps me give a useful reply.';
  return errors;
};

const fieldClasses = (hasError) => [
  'w-full px-4 py-3 border bg-white/90 dark:bg-gray-800/60 supports-[backdrop-filter]:backdrop-blur',
  'text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]',
  hasError
    ? 'border-red-600 dark:border-red-400'
    : 'border-gray-400/70 dark:border-white/20',
].join(' ');

const ContactForm = ({ compact = false, onSent }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { tone: 'ok' | 'error' | 'info', text }
  const [sending, setSending] = useState(false);
  const isConfigured = hasEnv();
  const uid = useId();
  // Bots fill every field they find; humans never see this one.
  const honeypotRef = useRef(null);

  const fieldId = (field) => `${uid}-${field}`;
  const errorId = (field) => `${uid}-${field}-error`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    // Clear an error as soon as the person starts correcting it.
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validate(formData);
    setErrors((current) => ({ ...current, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypotRef.current?.value) return; // silently drop bot submissions

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus({ tone: 'error', text: 'Check the highlighted fields and try again.' });
      const firstInvalid = Object.keys(fieldErrors)[0];
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus(null);
    setSending(true);

    if (isConfigured) {
      try {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          formData,
          process.env.REACT_APP_EMAILJS_USER_ID
        );
        setStatus({ tone: 'ok', text: 'Message sent. I’ll reply within 1–2 business days.' });
        setFormData({ name: '', email: '', message: '' });
        onSent && onSent();
      } catch {
        setStatus({
          tone: 'error',
          text: `Sending failed. Email me directly at ${DIRECT_EMAIL}.`,
        });
      } finally {
        setSending(false);
      }
    } else {
      setStatus({ tone: 'info', text: 'Opening your email app…' });
      const mailto = `mailto:${DIRECT_EMAIL}?subject=Portfolio%20message%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nfrom: ' + formData.email)}`;
      window.location.href = mailto;
      setSending(false);
    }
  };

  const statusTone = {
    ok: 'text-green-700 dark:text-green-300',
    error: 'text-red-700 dark:text-red-300',
    info: 'text-gray-600 dark:text-gray-300',
  };

  const renderError = (field) =>
    errors[field] ? (
      <p id={errorId(field)} className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby={`${uid}-note`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="sr-only" htmlFor={fieldId('name')}>Your name</label>
          <input
            id={fieldId('name')}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={`${fieldClasses(errors.name)} rounded-full`}
          />
          {renderError('name')}
        </div>
        <div>
          <label className="sr-only" htmlFor={fieldId('email')}>Email address</label>
          <input
            id={fieldId('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email address"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? errorId('email') : undefined}
            className={`${fieldClasses(errors.email)} rounded-full`}
          />
          {renderError('email')}
        </div>
      </div>
      <div>
        <label className="sr-only" htmlFor={fieldId('message')}>Your message</label>
        <textarea
          id={fieldId('message')}
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={compact ? 3 : 5}
          placeholder="Write your message..."
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? errorId('message') : undefined}
          className={`${fieldClasses(errors.message)} rounded-2xl`}
        />
        {renderError('message')}
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech, but present in the DOM. */}
      <div className="absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor={fieldId('company')}>Company (leave this empty)</label>
        <input
          ref={honeypotRef}
          id={fieldId('company')}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={sending}
          className="keep-fg inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
        >
          {sending ? 'Sending…' : 'Send Message'}
        </button>
        <p role="status" aria-live="polite" className={`text-sm ${status ? statusTone[status.tone] : ''}`}>
          {status?.text ?? ''}
        </p>
      </div>

      <p id={`${uid}-note`} className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {!isConfigured ? (
          <>Submitting opens your email app. Prefer a direct link? <a href={`mailto:${DIRECT_EMAIL}`} className="font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-950 dark:text-gray-200 dark:hover:text-white">{DIRECT_EMAIL}</a></>
        ) : 'I’ll respond to your message as soon as I can.'}
      </p>
    </form>
  );
};

export default ContactForm;
