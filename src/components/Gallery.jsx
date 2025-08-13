import React, { useState, useCallback } from 'react';

const Gallery = () => {
  const photos = [
    { src: '/assets/DSCF2424-2.jpg', alt: 'Photo 1' },
    { src: '/assets/PIC00687-2.jpg', alt: 'Photo 2' },
    { src: '/assets/PIC00210.jpg', alt: 'Photo 3' },
    { src: '/assets/PIC00211.JPG', alt: 'Photo 4' },
    { src: '/assets/PIC00523.JPG', alt: 'Photo 5' },
    { src: '/assets/000223860028.jpg', alt: 'Photo 6' },
    { src: '/assets/IMG_2508.jpeg', alt: 'Photo 7' },
    { src: '/assets/IMG_2510.jpeg', alt: 'Photo 8' },
    { src: '/assets/IMG_2522.jpeg', alt: 'Photo 9' },
    { src: '/assets/IMG_2524.jpeg', alt: 'Photo 10' },
    { src: '/assets/IMG_2526.jpeg', alt: 'Photo 11' },
    { src: '/assets/IMG_2527.jpeg', alt: 'Photo 12' },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [imageLoading, setImageLoading] = useState({});

  const openModal = useCallback((photo) => {
    setSelectedPhoto(photo);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, photos.length));
  };

  const handleViewLess = () => {
    setVisibleCount(3);
  };

  const handleImageLoad = useCallback((index) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  }, []);

  const handleImageLoadStart = useCallback((index) => {
    setImageLoading(prev => ({ ...prev, [index]: true }));
  }, []);

  const visiblePhotos = photos.slice(0, visibleCount);
  const hasMorePhotos = visibleCount < photos.length;
  const canShowLess = visibleCount > 3;

  return (
  <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Background orbs (hidden on small screens) */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/30 to-indigo-300/20 blur-2xl" />
      <div className="hidden md:block pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/20 to-rose-300/20 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Photography Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePhotos.map((photo, index) => (
            <div
              key={index}
              className="relative group rounded-3xl p-2 sm:p-3 border border-black/5 dark:border-white/10 supports-[backdrop-filter]:backdrop-blur-md bg-white/60 dark:bg-gray-800/40 shadow-sm hover:shadow-md cursor-pointer transform-gpu [will-change:transform] motion-safe:transition-[box-shadow,transform,opacity] motion-safe:duration-200"
              onClick={() => openModal(photo)}
            >
              {/* halo */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-sky-400/25 to-transparent opacity-0 group-hover:opacity-100 blur-xl md:blur-2xl motion-safe:transition-opacity" />

              {/* image tile */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 dark:bg-gray-700">
                {imageLoading[index] && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200/70 to-gray-300/60 dark:from-gray-700/60 dark:to-gray-600/60" />
                )}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(index)}
                  onLoadStart={() => handleImageLoadStart(index)}
                  className="h-full w-full object-cover transform-gpu motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
                  style={{ WebkitBackfaceVisibility: 'hidden' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 motion-safe:transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* View More/Less Controls */}
        <div className="flex justify-center mt-12 gap-4">
          {hasMorePhotos && (
            <button
              onClick={handleViewMore}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 shadow hover:brightness-110 motion-safe:transition-colors"
            >
              View More ({photos.length - visibleCount} remaining)
            </button>
          )}
          {canShowLess && (
            <button
              onClick={handleViewLess}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm border border-black/5 dark:border-white/10 bg-white/80 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow motion-safe:transition"
            >
              View Less
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 supports-[backdrop-filter]:backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <button
              className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full w-auto h-auto rounded-xl object-contain transform-gpu motion-safe:transition-transform motion-safe:duration-200"
              style={{ WebkitBackfaceVisibility: 'hidden', imageOrientation: 'from-image' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;