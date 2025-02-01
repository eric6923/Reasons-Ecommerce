import React from 'react';

  const images = [
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380119/11_d87dr2.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380156/12_frxufv.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380253/13_a1p9ic.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380253/14_eu6izr.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380342/15_i5ho9v.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380342/16_bt55im.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380424/17_fms5qq.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380425/18_rgrsaj.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380655/19_vzwupx.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380655/20_rdg5lv.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380745/21_an3b0t.jpg',
    'https://res.cloudinary.com/djrbv23s0/image/upload/v1738380745/22_d7oev3.jpg',
  ];
  export default function ImageLayout() { 
  return (
    <div className="masonry-container">
      <div className="masonry-layout">
        {images.map((src, index) => (
          <div key={index} className="masonry-item">
            <img src={src} alt={`Masonry item ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Description section */}
      <div className="description-section">
        <p className="description-text">
          Discover the essence of timeless beauty with our exclusive Indian bride jewelry collection. Each piece is meticulously crafted to celebrate heritage and elegance, offering a perfect blend of tradition and modern style.
        </p>
        <button className="explore-button">Explore Collection</button>
      </div>

      <style jsx>{`
        .masonry-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Video Container */
        .video-container {
          text-align: center;
        }

        .masonry-layout {
          column-count: 4;
          column-gap: 20px;
          padding: 20px;
        }

        .masonry-item {
          display: inline-block;
          width: 100%;
          margin-bottom: 20px;
        }

        .masonry-item img {
          width: 100%;
          display: block;
          border-radius: 1rem;
        }

        /* Description Section */
        .description-section {
          text-align: center;
          margin-top: 30px;
          margin: 10px;
        }

        .description-text {
          font-family: 'Raleway', sans-serif;
          font-size: 0.9rem;
          margin-bottom: 20px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .explore-button {
          background-color: #000000;
          border: none;
          padding: 10px 20px;
          border-radius: 19px;
          color: white;
          font-family: 'Rubik', sans-serif;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .explore-button:hover {
          background-color: #878687;
        }

        .bottom-image {
          margin-top: 30px;
          margin-bottom: 30px;
          width: 100%;
          max-width: 600px;
          border-radius: 4rem;
        }

        @media (max-width: 1200px) {
          .masonry-layout {
            column-count: 3;
          }
        }

        @media (max-width: 900px) {
          .masonry-layout {
            column-count: 2;
          }
        }

        @media (max-width: 600px) {
          .masonry-layout {
            column-count: 2;
            column-gap: 10px;
            padding: 10px;
          }
          .masonry-item {
            margin-bottom: 6px;
          }
        }
      `}</style>
    </div>
  );
}
