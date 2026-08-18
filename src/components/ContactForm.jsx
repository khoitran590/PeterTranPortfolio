// src/components/ContactForm.jsx
import React, { useId, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

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

const inputBaseClasses = (hasError) =>
  cn(
    'w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-200',
    'bg-white/[0.04] border text-white placeholder:text-white/40',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus:border-transparent',
    hasError
      ? 'border-rose-500/80 bg-rose-500/[0.05] focus-visible:ring-rose-400'
      : 'border-white/10 hover:border-white/20 focus:bg-white/[0.07]'
  );

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
        setStatus({ tone: 'ok', text: 'Message sent! I’ll reply within 24–48 hours.' });
        setFormData({ name: '', email: '', message: '' });
        onSent && onSent();
      } catch {
        setStatus({
          tone: 'error',
          text: `Sending failed. Please email me directly at ${DIRECT_EMAIL}.`,
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

  const renderError = (field) =>
    errors[field] ? (
      <p id={errorId(field)} className="mt-1.5 text-xs font-medium text-rose-400 flex items-center gap-1">
        <AlertCircle size={13} aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby={`${uid}-note`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/80 mb-1.5" htmlFor={fieldId('name')}>
            Your name
          </label>
          <input
            id={fieldId('name')}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Alex Johnson"
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={inputBaseClasses(errors.name)}
          />
          {renderError('name')}
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/80 mb-1.5" htmlFor={fieldId('email')}>
            Email address
          </label>
          <input
            id={fieldId('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="alex@company.com"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? errorId('email') : undefined}
            className={inputBaseClasses(errors.email)}
          />
          {renderError('email')}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/80 mb-1.5" htmlFor={fieldId('message')}>
          Your message
        </label>
        <textarea
          id={fieldId('message')}
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={compact ? 3 : 4}
          placeholder="Hi Peter, I'd like to discuss an opportunity or project..."
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? errorId('message') : undefined}
          className={inputBaseClasses(errors.message)}
        />
        {renderError('message')}
      </div>

      {/* Honeypot */}
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

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-md transition-all hover:bg-slate-100 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
        >
          <Send size={15} aria-hidden="true" />
          <span>{sending ? 'Sending…' : 'Send Message'}</span>
        </button>

        {/* Stays mounted even while empty: a live region inserted into the DOM
            together with its text is generally not announced, so screen readers
            would miss every send result. Only the contents swap. */}
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'text-xs font-medium flex items-center gap-1.5',
            status?.tone === 'ok' && 'text-emerald-400',
            status?.tone === 'error' && 'text-rose-400',
            status?.tone === 'info' && 'text-white/70'
          )}
        >
          {status?.tone === 'ok' ? (
            <CheckCircle2 size={15} aria-hidden="true" />
          ) : status?.tone === 'error' ? (
            <AlertCircle size={15} aria-hidden="true" />
          ) : null}
          {status?.text}
        </p>
      </div>

      <p id={`${uid}-note`} className="text-[11px] leading-relaxed text-white/50 pt-1">
        {!isConfigured ? (
          <>
            Submitting opens your email app. Prefer direct email?{' '}
            <a
              href={`mailto:${DIRECT_EMAIL}`}
              className="font-semibold text-white/80 underline underline-offset-2 hover:text-white"
            >
              {DIRECT_EMAIL}
            </a>
          </>
        ) : (
          'Protected with honeypot spam filtering. Responses are sent within 24–48 hours.'
        )}
      </p>
    </form>
  );
};

export default ContactForm;
