import React from 'react';

const VideoComponent = () => {
  return (
    <div className="flex flex-col justify-between items-center w-full">
      {/* Title Section */}
      <div className="mb-8">
      
        <p className="mt-4 text-lg md:text-xl text-center text-black mx-2" style={{ fontFamily: 'Rubik, sans-serif' }}>
          Handcrafted with elegance, capturing timeless beauty in every piece.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        {/* Video 1 (Visible on all screens) */}
        <div className="relative w-full h-screen mb-3 md:w-1/3">
          <video
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/djrbv23s0/video/upload/v1738379236/video3_jczqhj.mp4"
            muted
            autoPlay
            loop
          >
            Your browser does not support the video tag.
          </video>
          <h2 className="absolute bottom-20 left-0 right-0 text-center text-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>
            Exquisite craftsmanship in every detail
          </h2>
        </div>

        {/* Video 2 (Visible only on screens wider than 900px) */}
        <div className="relative w-full h-screen md:w-1/3 mb-3 hidden md:block">
          <video
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/djrbv23s0/video/upload/v1738379240/video2_czw0lp.mp4"
            muted
            autoPlay
            loop
          >
            Your browser does not support the video tag.
          </video>
          <h2 className="absolute bottom-20 left-0 right-0 text-center text-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>
            Elegance that shines through every piece
          </h2>
        </div>

        {/* Video 3 (Visible only on screens wider than 900px) */}
        <div className="relative w-full h-screen md:w-1/3 mb-3 hidden md:block">
          <video
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/djrbv23s0/video/upload/v1738379243/video1_kwqo22.mp4"
            muted
            autoPlay
            loop
          >
            Your browser does not support the video tag.
          </video>
          <h2 className="absolute bottom-20 left-0 right-0 text-center text-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>
            Timeless beauty in every jewelry piece
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
