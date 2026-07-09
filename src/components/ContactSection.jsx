// src/components/ContactSection.jsx – ContactCard layout with corner plus icons
import React from 'react';
import { Github, Linkedin, Mail, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import ContactForm from './ContactForm';

const contactInfo = [
  {
    icon: Github,
    label: 'GitHub',
    value: 'khoitran590',
    href: 'https://github.com/khoitran590',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'peterkhoitran',
    href: 'https://www.linkedin.com/in/peterkhoitran/',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'khoitran590@gmail.com',
    href: 'mailto:khoitran590@gmail.com',
  },
];

function ContactInfo({ icon: Icon, label, value, href, className }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'flex items-center gap-3 py-3 group/info rounded-lg transition-colors',
        className
      )}
    >
      <div className="bg-white/10 rounded-lg p-3 transition-colors group-hover/info:bg-white/20">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="font-medium text-white">{label}</p>
        <p className="text-gray-400 text-xs truncate">{value}</p>
      </div>
    </a>
  );
}

export function ContactCard({
  title = 'Get in Touch',
  description,
  contactInfo: info,
  className,
  formSectionClassName,
  children,
}) {
  return (
    <div
      className={cn(
        'relative grid h-full w-full border border-white/10 bg-white/[0.03] supports-[backdrop-filter]:backdrop-blur-md shadow-2xl shadow-black/40 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      <Plus className="absolute -top-3 -left-3 h-6 w-6 text-white/40" />
      <Plus className="absolute -top-3 -right-3 h-6 w-6 text-white/40" />
      <Plus className="absolute -bottom-3 -left-3 h-6 w-6 text-white/40" />
      <Plus className="absolute -right-3 -bottom-3 h-6 w-6 text-white/40" />

      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-white">{title}</h2>
          <p className="text-gray-400 max-w-xl text-sm md:text-base lg:text-lg">
            {description}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {info?.map((item, index) => (
              <ContactInfo key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'bg-white/[0.03] flex h-full w-full items-center border-t border-white/10 p-5 md:col-span-1 md:border-t-0 md:border-l',
          formSectionClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-16 overflow-hidden scroll-mt-24">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <ContactCard
          title="Get in Touch"
          description="Have a project or role in mind? Fill out the form and I'll get back within 1–2 business days."
          contactInfo={contactInfo}
        >
          <div className="w-full">
            <ContactForm compact />
          </div>
        </ContactCard>
      </div>
    </section>
  );
}
