// src/components/Gallery.jsx – personal photography, on the bento strip
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import InteractiveImageBentoGallery from './ui/bento-gallery';

// All 13 photos from public/assets/gallery, in display order.
//
// Order matters: the strip is `grid-flow-col` over two rows, so items fill
// column by column. Three `row-span-2` items each claim a whole column and the
// ten `row-span-1` items pair up, which packs 13 photos into exactly 8 full
// columns with no half-empty gap at the end. Re-ordering or changing the count
// of tall items will leave a hole unless the tall count stays odd.
//
// The tall slots are the two true portraits plus the alley, the three frames
// whose composition survives a vertical crop.
//
// `desc` is the hover caption and is Peter's to fill in — several of these are
// recognisable, but I am not going to caption his own trip for him.
const mediaItems = [
  { id: 'PIC00523', title: 'Photography 01', desc: '', url: '/assets/opt/PIC00523_full.jpg', thumb: '/assets/opt/PIC00523_thumb.jpg', width: 640, height: 400, span: 'row-span-1' },
  { id: '000223860028', title: 'Photography 02', desc: '', url: '/assets/opt/000223860028_full.jpg', thumb: '/assets/opt/000223860028_thumb.jpg', width: 640, height: 424, span: 'row-span-1' },
  { id: 'IMG_2510', title: 'Photography 03', desc: '', url: '/assets/opt/IMG_2510_full.jpg', thumb: '/assets/opt/IMG_2510_thumb.jpg', width: 640, height: 960, span: 'row-span-2' },
  { id: 'IMG_2508', title: 'Photography 04', desc: '', url: '/assets/opt/IMG_2508_full.jpg', thumb: '/assets/opt/IMG_2508_thumb.jpg', width: 640, height: 317, span: 'row-span-1' },
  { id: 'IMG_2522', title: 'Photography 05', desc: '', url: '/assets/opt/IMG_2522_full.jpg', thumb: '/assets/opt/IMG_2522_thumb.jpg', width: 640, height: 387, span: 'row-span-1' },
  { id: 'IMG_2526', title: 'Photography 06', desc: '', url: '/assets/opt/IMG_2526_full.jpg', thumb: '/assets/opt/IMG_2526_thumb.jpg', width: 640, height: 942, span: 'row-span-2' },
  { id: 'PIC00687-2', title: 'Photography 07', desc: '', url: '/assets/opt/PIC00687-2_full.jpg', thumb: '/assets/opt/PIC00687-2_thumb.jpg', width: 640, height: 426, span: 'row-span-1' },
  { id: 'PIC00210', title: 'Photography 08', desc: '', url: '/assets/opt/PIC00210_full.jpg', thumb: '/assets/opt/PIC00210_thumb.jpg', width: 640, height: 405, span: 'row-span-1' },
  { id: 'IMG_2524', title: 'Photography 09', desc: '', url: '/assets/opt/IMG_2524_full.jpg', thumb: '/assets/opt/IMG_2524_thumb.jpg', width: 640, height: 375, span: 'row-span-2' },
  { id: 'IMG_2527', title: 'Photography 10', desc: '', url: '/assets/opt/IMG_2527_full.jpg', thumb: '/assets/opt/IMG_2527_thumb.jpg', width: 640, height: 346, span: 'row-span-1' },
  { id: 'PIC00211', title: 'Photography 11', desc: '', url: '/assets/opt/PIC00211_full.jpg', thumb: '/assets/opt/PIC00211_thumb.jpg', width: 640, height: 386, span: 'row-span-1' },
  { id: 'DSCF2424-2', title: 'Photography 12', desc: '', url: '/assets/opt/DSCF2424-2_full.jpg', thumb: '/assets/opt/DSCF2424-2_thumb.jpg', width: 640, height: 426, span: 'row-span-1' },
  { id: 'PIC00027', title: 'Photography 13', desc: '', url: '/assets/opt/PIC00027_full.jpg', thumb: '/assets/opt/PIC00027_thumb.jpg', width: 640, height: 400, span: 'row-span-1' },
];

function GalleryDialog({ item, onClose, onPrevious, onNext }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();

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
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="keep-fg fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        initial={reduceMotion ? false : { scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={reduceMotion ? undefined : { scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p id="gallery-dialog-title" className="text-sm font-semibold text-white">
            {item.title}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]"
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
            className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] sm:left-5"
            aria-label="View previous photo"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] sm:right-5"
            aria-label="View next photo"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
        <p className="px-5 py-4 text-sm text-white/65">Use the arrow keys to browse, or Escape to close.</p>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const openerRef = useRef(null);
  const selectedItem = selectedIndex === null ? null : mediaItems[selectedIndex];

  const openGallery = useCallback((index) => {
    openerRef.current = document.activeElement;
    setSelectedIndex(index);
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
    // Return focus to the card that opened the dialog.
    window.setTimeout(() => openerRef.current?.focus?.(), 0);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((index) => (index === 0 ? mediaItems.length - 1 : index - 1));
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((index) => (index === mediaItems.length - 1 ? 0 : index + 1));
  }, []);

  return (
    <div id="gallery" className="scroll-mt-24">
      <InteractiveImageBentoGallery
        imageItems={mediaItems}
        headingId="gallery-heading"
        title="A little perspective outside the screen."
        description="Photography is a personal creative practice that keeps me observant, curious, and attentive to detail. Drag or scroll sideways to explore, then pick any frame to see it full size."
        onSelect={openGallery}
      />

      <AnimatePresence>
        {selectedItem ? (
          <GalleryDialog
            key="gallery-dialog"
            item={selectedItem}
            onClose={closeGallery}
            onPrevious={showPrevious}
            onNext={showNext}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
