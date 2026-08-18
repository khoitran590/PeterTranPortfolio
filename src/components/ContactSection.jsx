// src/components/ContactSection.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import ContactForm from './ContactForm';

const EMAIL = 'khoitran590@gmail.com';

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
    >
      {copied ? (
        <Check size={16} className="text-emerald-400" aria-hidden="true" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
      <span>{copied ? 'Copied to clipboard!' : 'Copy email address'}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${EMAIL} copied to clipboard` : ''}
      </span>
    </button>
  );
}

const contactChannels = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/peterkhoitran',
    href: 'https://www.linkedin.com/in/peterkhoitran/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/khoitran590',
    href: 'https://github.com/khoitran590',
  },
  {
    icon: Mail,
    label: 'Direct Email',
    value: 'khoitran590@gmail.com',
    href: 'mailto:khoitran590@gmail.com',
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[calc(100svh-5.5rem)] w-full items-center justify-center py-12 sm:py-16 lg:py-20 scroll-mt-24 overflow-hidden"
    >
      {/* Ambient background glow orbs */}
      <div className="hidden md:block pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/10 to-sky-500/10 blur-3xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-500/10 to-rose-500/10 blur-3xl" />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Unified Glass Contact Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Direct Reach & Recruiter Info */}
            <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
              <div className="space-y-6">
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for opportunities
                </div>

                <div>
                  <p className="section-kicker">Get in touch</p>
                  <h2 id="contact-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Let’s build something together.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                    Whether you have an open engineering role, a project idea, or just want to connect, I’d love to hear from you.
                  </p>
                </div>

                {/* Direct Contact Channels */}
                <div className="space-y-3 pt-2">
                  {contactChannels.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:translate-x-0.5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-white">
                          <Icon size={18} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white/80">{label}</p>
                          <p className="text-xs text-white/60 truncate">{value}</p>
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="text-white/40 shrink-0 transition-transform group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Details & Copy Pill */}
              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="accent-text" aria-hidden="true" />
                    <span>Replies within 24–48h</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="accent-text" aria-hidden="true" />
                    <span>California, USA (PST)</span>
                  </div>
                </div>

                <div>
                  <CopyEmailButton />
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Send a direct message</h3>
                <p className="mt-1 text-xs sm:text-sm text-white/60">
                  Fill out the form below and it will route directly to my inbox.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
