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
    <section id="gallery" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Photography Gallery
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePhotos.map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md dark:shadow-gray-700 cursor-pointer relative"
              onClick={() => openModal(photo)}
            >
              {imageLoading[index] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400">Loading...</div>
                </div>
              )}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                onLoadStart={() => handleImageLoadStart(index)}
                className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />
            </div>
          ))}
        </div>
        
        {/* View More/Less Controls */}
        <div className="flex justify-center mt-12 space-x-4">
          {hasMorePhotos && (
            <button
              onClick={handleViewMore}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors transform hover:scale-105"
            >
              View More ({photos.length - visibleCount} remaining)
            </button>
          )}
          {canShowLess && (
            <button
              onClick={handleViewLess}
              className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors transform hover:scale-105"
            >
              View Less
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 dark:bg-black dark:bg-opacity-85 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <button
              className="absolute top-4 right-4 text-white dark:text-gray-200 text-3xl font-bold hover:text-gray-300 dark:hover:text-white transition-colors z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              loading="lazy"
              className="max-w-full max-h-full w-auto h-auto rounded-lg object-contain"
              style={{
                imageRendering: 'high-quality',
                WebkitBackfaceVisibility: 'hidden',
                imageOrientation: 'from-image'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;