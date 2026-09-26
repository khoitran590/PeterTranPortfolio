import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import ContactForm, { isEmailConfigured } from './ContactForm';

const EMAIL = 'khoitran590@gmail.com';

export default function ContactSection() {
  const configured = isEmailConfigured();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[calc(100svh-5.5rem)] w-full items-center scroll-mt-24 overflow-hidden pb-16 pt-28 sm:pt-32 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:pt-5">
            <h2 id="contact-heading" className="page-heading font-extrabold tracking-tight text-white">
              Let’s build something together.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Have an engineering role or project in mind? Send a note and tell me what you’re working on.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-flex min-h-11 items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-[color:var(--accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
            >
              <Mail size={20} className="accent-text" aria-hidden="true" />
              {EMAIL}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5">
              <a href="https://www.linkedin.com/in/peterkhoitran/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]">
                <Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href="https://github.com/khoitran590" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]">
                <Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl font-bold text-white">{configured ? 'Send a message' : 'Write an email'}</h3>
            <p className="mt-1 mb-6 text-sm text-white/60">
              {configured
                ? 'The form sends your message directly to my inbox.'
                : 'The form prepares a message in your email app for you to send.'}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
