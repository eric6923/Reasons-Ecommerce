import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ImageComponent = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const images = gsap.utils.toArray('.scroll-image');

    images.forEach((image, index) => {
      gsap.fromTo(image, 
        { y: 100, opacity: 0 }, 
        {
          y: 0, 
          opacity: 1, 
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          }
        }
      );
    });
  }, []);

  const images = [
    {
      src: "https://i.pinimg.com/736x/fd/48/59/fd4859ad9cf1bce79c972d82162ade7f.jpg",
      text: "Elegance Redefined",
    },
    {
      src: "https://yaksideepthireddy.in/cdn/shop/files/Yaksi0506.jpg?v=1720978827&width=1445",
      text: "Timeless Beauty",
    },
    {
      src: "https://www.gngmodels.com/wp-content/uploads/2022/02/PBS_1508-Final-682x1024.jpg",
      text: "Where Excellence Meets Craftsmanship",
    },
  ];

  return (
    <div className="w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-full h-screen overflow-hidden"
        >
          <img
            src={image.src}
            alt={`Jewelry ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover brightness-50 scroll-image" // Set brightness to 50%
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl text-white md:text-3xl font-semibold hero-title" style={{ fontFamily: 'Playfair Display, serif' }}>
              {image.text}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageComponent;
