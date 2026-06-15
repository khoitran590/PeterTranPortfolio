// src/components/Gallery.jsx – interactive bento gallery with draggable dock modal
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AnimatedHeading from './ScrollFx';

const mediaItems = [
  { id: 1, type: 'image', title: 'Photo 1', desc: '', url: '/assets/opt/DSCF2424-2_full.jpg', thumb: '/assets/opt/DSCF2424-2_thumb.jpg', span: 'sm:col-span-2 sm:row-span-4 col-span-1 row-span-3' },
  { id: 2, type: 'image', title: 'Photo 2', desc: '', url: '/assets/opt/PIC00687-2_full.jpg', thumb: '/assets/opt/PIC00687-2_thumb.jpg', span: 'col-span-1 row-span-3' },
  { id: 3, type: 'image', title: 'Photo 3', desc: '', url: '/assets/opt/PIC00210_full.jpg', thumb: '/assets/opt/PIC00210_thumb.jpg', span: 'col-span-1 row-span-3' },
  { id: 4, type: 'image', title: 'Photo 4', desc: '', url: '/assets/opt/PIC00211_full.jpg', thumb: '/assets/opt/PIC00211_thumb.jpg', span: 'col-span-1 row-span-4' },
  { id: 5, type: 'image', title: 'Photo 5', desc: '', url: '/assets/opt/PIC00523_full.jpg', thumb: '/assets/opt/PIC00523_thumb.jpg', span: 'col-span-1 row-span-3' },
  { id: 6, type: 'image', title: 'Photo 6', desc: '', url: '/assets/opt/000223860028_full.jpg', thumb: '/assets/opt/000223860028_thumb.jpg', span: 'sm:col-span-2 sm:row-span-3 col-span-1 row-span-3' },
  { id: 7, type: 'image', title: 'Photo 7', desc: '', url: '/assets/opt/IMG_2508_full.jpg', thumb: '/assets/opt/IMG_2508_thumb.jpg', span: 'col-span-1 row-span-4' },
  { id: 8, type: 'image', title: 'Photo 8', desc: '', url: '/assets/opt/IMG_2510_full.jpg', thumb: '/assets/opt/IMG_2510_thumb.jpg', span: 'col-span-1 row-span-3' },
  { id: 9, type: 'image', title: 'Photo 9', desc: '', url: '/assets/opt/IMG_2522_full.jpg', thumb: '/assets/opt/IMG_2522_thumb.jpg', span: 'col-span-1 row-span-4' },
  { id: 10, type: 'image', title: 'Photo 10', desc: '', url: '/assets/opt/IMG_2524_full.jpg', thumb: '/assets/opt/IMG_2524_thumb.jpg', span: 'sm:col-span-2 sm:row-span-3 col-span-1 row-span-3' },
  { id: 11, type: 'image', title: 'Photo 11', desc: '', url: '/assets/opt/IMG_2526_full.jpg', thumb: '/assets/opt/IMG_2526_thumb.jpg', span: 'col-span-1 row-span-3' },
  { id: 12, type: 'image', title: 'Photo 12', desc: '', url: '/assets/opt/IMG_2527_full.jpg', thumb: '/assets/opt/IMG_2527_thumb.jpg', span: 'col-span-1 row-span-3' },
];

// Renders an image media item (video support could be added later).
// Uses the small thumbnail by default; pass `full` for the modal-size image.
const MediaItem = ({ item, className, onClick, full = false }) => (
  <img
    src={full ? item.url : item.thumb || item.url}
    alt={item.title}
    className={`${className} object-cover cursor-pointer`}
    onClick={onClick}
    loading="lazy"
    decoding="async"
    style={{ imageOrientation: 'from-image' }}
  />
);

// Modal with the selected photo and a draggable dock of thumbnails
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems: items }) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed inset-0 w-full min-h-screen bg-black/80 backdrop-blur-lg overflow-hidden z-[70]"
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-3xl h-auto max-h-[70vh] rounded-lg overflow-hidden shadow-md"
                initial={{ y: 20, scale: 0.97 }}
                animate={{
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 },
                }}
                exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
                onClick={onClose}
              >
                <MediaItem
                  item={selectedItem}
                  full
                  className="w-full h-full object-contain bg-black/40"
                  onClick={onClose}
                />
                {selectedItem.desc && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">
                      {selectedItem.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">{selectedItem.desc}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Close Button */}
        <motion.button
          className="absolute top-2 sm:top-2.5 md:top-3 right-2 sm:right-2.5 md:right-3 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs sm:text-sm backdrop-blur-sm"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close gallery"
        >
          <X className="w-3 h-3" />
        </motion.button>
      </motion.div>

      {/* Draggable Dock */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }));
        }}
        className="fixed z-[80] left-1/2 bottom-4 -translate-x-1/2 touch-none"
      >
        <motion.div className="relative rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg cursor-grab active:cursor-grabbing">
          <div className="flex items-center -space-x-2 px-3 py-2">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                style={{
                  zIndex: selectedItem.id === item.id ? 30 : items.length - index,
                }}
                className={`
                  relative group
                  w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0
                  rounded-lg overflow-hidden
                  cursor-pointer hover:z-20
                  ${selectedItem.id === item.id
                    ? 'ring-2 ring-white/70 shadow-lg'
                    : 'hover:ring-2 hover:ring-white/30'}
                `}
                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 0,
                  y: -10,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
              >
                <MediaItem
                  item={item}
                  className="w-full h-full"
                  onClick={() => setSelectedItem(item)}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                {selectedItem.id === item.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute -inset-2 bg-white/20 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <AnimatedHeading text="Photography Gallery" className="mt-4" />
          <motion.p
            className="mt-3 text-sm sm:text-base text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Click a photo to view it — drag tiles to rearrange the grid.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {selectedItem ? (
            <GalleryModal
              selectedItem={selectedItem}
              isOpen={true}
              onClose={() => setSelectedItem(null)}
              setSelectedItem={setSelectedItem}
              mediaItems={items}
            />
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`media-${item.id}`}
                  className={`relative overflow-hidden rounded-xl cursor-move border border-white/10 ${item.span}`}
                  onClick={() => !isDragging && setSelectedItem(item)}
                  variants={{
                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                    visible: {
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 350,
                        damping: 25,
                        delay: index * 0.05,
                      },
                    },
                  }}
                  whileHover={{ scale: 1.02 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, info) => {
                    setIsDragging(false);
                    const moveDistance = info.offset.x + info.offset.y;
                    if (Math.abs(moveDistance) > 50) {
                      const newItems = [...items];
                      const draggedItem = newItems[index];
                      const targetIndex =
                        moveDistance > 0
                          ? Math.min(index + 1, items.length - 1)
                          : Math.max(index - 1, 0);
                      newItems.splice(index, 1);
                      newItems.splice(targetIndex, 0, draggedItem);
                      setItems(newItems);
                    }
                  }}
                >
                  <MediaItem
                    item={item}
                    className="absolute inset-0 w-full h-full"
                    onClick={() => !isDragging && setSelectedItem(item)}
                  />
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      {item.desc && (
                        <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
