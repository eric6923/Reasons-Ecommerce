import React from 'react';

const MasonryGrid = () => {
  const images = [
    'https://i.pinimg.com/736x/39/16/25/39162561396505d2f40e7406d5e84bfd.jpg',
    'https://i.pinimg.com/736x/14/d7/6c/14d76c8a809968a5a99533f366ca500f.jpg',
    'https://i.pinimg.com/736x/56/e0/7d/56e07d1656c6a4ad6f5bb883cfc326cb.jpg',
    'https://i.pinimg.com/736x/5f/21/c0/5f21c0166bbca09dcfe99815bbe28de0.jpg',
    'https://i.pinimg.com/736x/5f/21/c0/5f21c0166bbca09dcfe99815bbe28de0.jpg',
  ];

  return (
    <div className="columns-1 md:columns-3 gap-0">
      {images.map((src, index) => (
        <div key={index} className="relative mb-4">
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-auto brightness-50 mb-2" // Adjust brightness and spacing
          />
          <button
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-transparent border border-white text-white font-semibold rubik px-4 py-2"
          >
            Explore
          </button>
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
