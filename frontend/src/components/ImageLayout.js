import React from 'react';

  const images = [
    'https://i.pinimg.com/564x/d4/32/19/d432190386cbd048ce5fdc9bfebaee23.jpg',
    'https://i.pinimg.com/564x/a5/c0/91/a5c091b694ac12f2116c5a29b7f3e8b4.jpg',
    'https://i.pinimg.com/736x/5f/ea/79/5fea7973f04dbf3cf53abb20fa2e4d8b.jpg',
    'https://i.pinimg.com/736x/35/c5/37/35c5379300a5814bb3516b1a3eeda0fe.jpg',
    'https://i.pinimg.com/564x/5b/44/52/5b44523bdd93797cd40848b5b358b520.jpg',
    'https://i.pinimg.com/564x/e7/3e/b6/e73eb610477d98e97ebf916592d825cc.jpg',
    'https://i.pinimg.com/564x/4c/84/7f/4c847fe7a1129c165415c46f2ed52977.jpg',
    'https://i.pinimg.com/736x/c7/c4/cf/c7c4cf76200c12dc698b970cb65218a6.jpg',
    'https://i.pinimg.com/564x/ab/6b/a8/ab6ba8df65b8747c34d53861d0063f3f.jpg',
    'https://i.pinimg.com/564x/8d/a9/bc/8da9bc5b626d298b9e2ba43bd4579a32.jpg',
    'https://i.pinimg.com/736x/da/e0/af/dae0afe558fc29c1759dfecae1cef049.jpg',
    'https://i.pinimg.com/564x/f5/e4/bd/f5e4bddf70b886fd33536bd9825c49f1.jpg',
  ];
  export default function ImageLayout() { 
  return (
    <div className="masonry-container">
      {/* Video Section without controls */}
      <div className="video-container mb-1">
        <video width="100%" autoPlay muted loop>
          <source src="/assets/HeroVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

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
