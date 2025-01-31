import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FaArrowDown } from "react-icons/fa";

const BrideGallery = () => {
  const images = [
    "https://i.pinimg.com/736x/57/b6/eb/57b6eb50e64fc15f06bd9311632710af.jpg",
    "https://i.pinimg.com/564x/5b/3c/f6/5b3cf632a9e57b4f7321c706705cc54c.jpg",
    "https://i.pinimg.com/736x/df/b9/48/dfb9488d74b8668bb2c13cc815907a3e.jpg",
    "https://i.pinimg.com/736x/9e/12/dc/9e12dc97a230581803e0afeebb3dc367.jpg",
    "https://i.pinimg.com/736x/05/97/ce/0597ce30940650855cb8e6d95c0bb885.jpg",
    "https://i.pinimg.com/564x/c7/99/3a/c7993a9958c080c81f0e3a58fcdc4adc.jpg",
    "https://i.pinimg.com/564x/b8/b2/9a/b8b29a76c54ca7b65790a3b9c26f41fe.jpg",
    "https://i.pinimg.com/736x/8e/d0/f7/8ed0f7651a6e023e90ae90806d334b4a.jpg",
    "https://i.pinimg.com/736x/cc/40/25/cc4025ce33307f0222e6533f54150aec.jpg",
    "https://i.pinimg.com/736x/b5/1b/66/b51b66914f6a561d46fea794818785df.jpg",
    "https://i.pinimg.com/736x/da/e0/af/dae0afe558fc29c1759dfecae1cef049.jpg",
    "https://i.pinimg.com/564x/20/bc/36/20bc36980c9cd1cd70fcf347ed72ff45.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Background Image with Scroll Icon */}
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url("./assets/v2/IMG_9019.jpg")`,
        }}
      >
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <FaArrowDown size={30} />
        </div>
      </div>

      {/* Description */}
      <div className="p-6 max-w-2xl text-center mt-4">
        <h1 className="text-4xl font-bold hero-title text-gray-800">
          The Elegance of an Indian Bride
        </h1>
        <p className="mt-2 text-gray-600">
          Discover the timeless beauty of an Indian bride through these stunning
          visuals. Each image captures the essence of grace, tradition, and
          style, resonating with cultural richness and elegance.
        </p>
      </div>

      {/* Masonry Gallery */}
      <div className="w-full p-6 max-w-4xl">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}>
          <Masonry gutter="10px">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Indian Bride"
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ borderRadius: "8px" }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default BrideGallery;
