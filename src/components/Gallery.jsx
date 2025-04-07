import React, { useState } from 'react';

const Gallery = () => {
  const photos = [
    { src: '/assets/DSCF2424-2.jpg', alt: 'Photo 1' },
    { src: '/assets/PIC00687-2.jpg', alt: 'Photo 2' },
    { src: '/assets/PIC00210.jpg', alt: 'Photo 3' },
    { src: '/assets/PIC00211.JPG', alt: 'Photo 4' },
    { src: '/assets/PIC00523.JPG', alt: 'Photo 5' },
    { src: '/assets/000223860028.jpg', alt: 'Photo 6' },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Photography Gallery
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => openModal(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;