// src/components/ui/bento-gallery.jsx
//
// Draggable bento strip. Ported from the TypeScript original to plain JSX, with
// the shadcn design tokens it assumed (bg-background, text-muted-foreground,
// bg-card, ring-ring) mapped onto this project's palette.
//
// Two structural changes from the source:
//
//   1. The horizontal axis is a real `overflow-x-auto` scroller that a pointer
//      drag nudges, rather than a framer-motion `drag="x"` transform. A
//      transformed track cannot be scrolled by the wheel, the trackpad, or —
//      the important one — by tabbing to an off-screen card, which left every
//      keyboard user unable to reach items past the fold.
//   2. It reports the chosen index upward instead of owning a lightbox, so the
//      existing dialog with its focus trap, Escape handling and arrow-key
//      paging stays in charge of the modal.
import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};

// Drag-to-scroll for the mouse. Touch already scrolls the container natively,
// so pointer events from a finger are left alone.
function useDragScroll() {
  const ref = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || !ref.current) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: ref.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event) => {
    if (!drag.current.active || !ref.current) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    ref.current.scrollLeft = drag.current.startScroll - delta;
  };

  const onPointerUp = () => {
    drag.current.active = false;
  };

  // Lets the card swallow the click that ends a drag, so dragging past a photo
  // does not also open it.
  const consumeDrag = () => {
    const moved = drag.current.moved;
    drag.current.moved = false;
    return moved;
  };

  return {
    ref,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp },
    consumeDrag,
  };
}

export default function InteractiveImageBentoGallery({
  imageItems,
  title,
  description,
  onSelect,
  headingId,
}) {
  const targetRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { ref: scrollerRef, handlers, consumeDrag } = useDragScroll();

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <section ref={targetRef} aria-labelledby={headingId} className="relative w-full py-16 sm:py-24">
      <motion.div
        style={reduceMotion ? undefined : { opacity, y }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <p className="section-kicker">Beyond the code</p>
        <h2
          id={headingId}
          className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{description}</p>
      </motion.div>

      {/* Same container as the heading above, so the strip starts on the
          heading's left edge instead of bleeding to the viewport edge. */}
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollerRef}
          {...handlers}
          className="w-full cursor-grab select-none overflow-x-auto overscroll-x-contain px-1 py-2 active:cursor-grabbing [scrollbar-width:thin]"
        >
          {/* Explicit row heights rather than grid-rows-2: the images are
              absolutely positioned, so `1fr` rows would collapse to zero.
              Columns are a fixed width at every breakpoint, so at 13 photos
              (8 columns, ~2400px) the track always overflows its container and
              therefore always fills it — the left-hugging only happened back
              when six photos fit inside the container with room to spare. */}
          <motion.div
            className="grid w-max auto-cols-[13rem] grid-flow-col grid-rows-[9rem_9rem] gap-4 sm:auto-cols-[16rem] sm:grid-rows-[11rem_11rem] lg:auto-cols-[18rem] lg:grid-rows-[13rem_13rem]"
            variants={reduceMotion ? undefined : containerVariants}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {imageItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                variants={reduceMotion ? undefined : itemVariants}
                className={cn(
                  'group relative flex h-full w-full items-end overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page-background)]',
                  item.span
                )}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => {
                  if (consumeDrag()) return;
                  onSelect(index);
                }}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.thumb}
                  alt=""
                  width={item.width}
                  height={item.height}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <div className="keep-fg relative z-10 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  {item.desc ? <p className="mt-1 text-sm text-white/80">{item.desc}</p> : null}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
