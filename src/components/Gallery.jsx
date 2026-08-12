// src/components/Gallery.jsx – accessible personal photography gallery
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const mediaItems = [
  { id: 1, title: 'Photography 01', url: '/assets/opt/DSCF2424-2_full.jpg', thumb: '/assets/opt/DSCF2424-2_thumb.jpg', span: 'sm:col-span-2 sm:row-span-4' },
  { id: 2, title: 'Photography 02', url: '/assets/opt/PIC00687-2_full.jpg', thumb: '/assets/opt/PIC00687-2_thumb.jpg', span: 'sm:row-span-3' },
  { id: 3, title: 'Photography 03', url: '/assets/opt/PIC00210_full.jpg', thumb: '/assets/opt/PIC00210_thumb.jpg', span: 'sm:row-span-3' },
  { id: 4, title: 'Photography 04', url: '/assets/opt/PIC00211_full.jpg', thumb: '/assets/opt/PIC00211_thumb.jpg', span: 'sm:row-span-4' },
  { id: 5, title: 'Photography 05', url: '/assets/opt/PIC00523_full.jpg', thumb: '/assets/opt/PIC00523_thumb.jpg', span: 'sm:row-span-3' },
  { id: 6, title: 'Photography 06', url: '/assets/opt/000223860028_full.jpg', thumb: '/assets/opt/000223860028_thumb.jpg', span: 'sm:col-span-2 sm:row-span-3' },
];

function GalleryDialog({ item, onClose, onPrevious, onNext }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-dialog-title"
    >
      <div ref={dialogRef} className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p id="gallery-dialog-title" className="text-sm font-semibold text-white">
            {item.title}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            aria-label="Close photography viewer"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black p-2 sm:p-5">
          <img
            src={item.url}
            alt={`${item.title} by Peter Tran`}
            className="max-h-[72vh] max-w-full object-contain"
          />
          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:left-5"
            aria-label="View previous photo"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:right-5"
            aria-label="View next photo"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
        <p className="px-5 py-4 text-sm text-white/65">Use the arrow keys to browse, or Escape to close.</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const openerRef = useRef(null);
  const selectedItem = selectedIndex === null ? null : mediaItems[selectedIndex];

  const openGallery = useCallback((index, event) => {
    openerRef.current = event.currentTarget;
    setSelectedIndex(index);
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
    window.setTimeout(() => openerRef.current?.focus(), 0);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((index) => (index === 0 ? mediaItems.length - 1 : index - 1));
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((index) => (index === mediaItems.length - 1 ? 0 : index + 1));
  }, []);

  return (
    <section aria-labelledby="gallery-heading" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Beyond the code</p>
          <h2 id="gallery-heading" className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            A little perspective outside the screen.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Photography is a personal creative practice that keeps me observant, curious, and
            attentive to detail.
          </p>
        </div>

        <div className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:grid-cols-3 sm:auto-rows-[100px] md:grid-cols-4">
          {mediaItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={(event) => openGallery(index, event)}
              className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-indigo-300 ${item.span}`}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.thumb}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-3 pb-3 pt-8 text-sm font-semibold text-white">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedItem ? (
        <GalleryDialog
          item={selectedItem}
          onClose={closeGallery}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </section>
  );
}
