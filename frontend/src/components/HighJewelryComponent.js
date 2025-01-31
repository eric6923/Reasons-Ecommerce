import React, { useEffect, useState } from 'react'; 
import { motion } from 'framer-motion';

const HighJewelryComponent = () => {
  const images = [
    'https://i.pinimg.com/564x/2d/de/c5/2ddec517c7e81652d59149832e00f343.jpg',
    'https://i.pinimg.com/564x/d1/ca/34/d1ca34132946191cea2c7bedcb1fc778.jpg',
    'https://i.pinimg.com/564x/fa/5c/5a/fa5c5ab467a9701330f25b1e8a47f8d5.jpg',
    'https://i.pinimg.com/originals/06/75/39/067539ee7b91c18d572e4898f4ae4e90.jpg',
    'https://i.pinimg.com/736x/37/bc/20/37bc20b88de8d1daeb2b1fcca9b23740.jpg',
    'https://i.pinimg.com/736x/ca/a2/45/caa2451db99c79a58d18b44aaa3912bd.jpg',
    'https://i.pinimg.com/736x/5c/53/4b/5c534b6a511f3fb9978991b5042af6aa.jpg',
    'https://i.pinimg.com/564x/d4/32/19/d432190386cbd048ce5fdc9bfebaee23.jpg',
    'https://i.pinimg.com/736x/63/07/01/6307015b579ba71bf3907e6fbe3707c2.jpg',
    'https://i.pinimg.com/564x/2d/de/c5/2ddec517c7e81652d59149832e00f343.jpg',
    'https://i.pinimg.com/564x/d1/ca/34/d1ca34132946191cea2c7bedcb1fc778.jpg',
    'https://i.pinimg.com/564x/fa/5c/5a/fa5c5ab467a9701330f25b1e8a47f8d5.jpg',
    'https://i.pinimg.com/originals/06/75/39/067539ee7b91c18d572e4898f4ae4e90.jpg',
  ];

  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize(); // Call on initial render

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-[#fcfcfc]">
      {/* Top Black Rectangle */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-black"></div>
      {/* Top Video Section */}
      <div className={`relative w-full mt-44 ${isDesktop ? 'h-[70vh]' : 'h-[50vh]'}`}>
        <video
          src="/assets/high3.mp4"
          className="w-full h-full"
          autoPlay
          loop
          muted
        />
      </div>

      {/* Text Section */}
      <div className="w-full text-center p-6">
        <h2 className="text-3xl font-bold hero-title">High Jewelry Collection</h2>
        <p className="text-lg text-justify leading-6 text-gray-600 mt-4">
          Immerse yourself in the world of exquisite craftsmanship and timeless elegance. Our high jewelry pieces are meticulously crafted to showcase the finest materials and innovative design.
        </p>
      </div>

      {/* Horizontal Image Gallery Section */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex w-max space-x-4"
          initial={{ x: 0 }}
          animate={{ x: isDesktop ? -scrollY * 0.5 : -scrollY * 2 }}
          transition={{ ease: 'linear', duration: 2 }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-64 h-100 flex-shrink-0">
              <img
                src={image}
                alt={`Jewelry Image ${index + 1}`}
                className="w-full h-full object-cover rounded-3xl shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video Section */}
      <div className="relative w-70 h-[70vh] mt-8">
        <video
          className="w-full h-full object-cover"
          src="/assets/high5.mp4"
          autoPlay
          loop
          muted
        />
      </div>
    </div>
  );
};

export default HighJewelryComponent;
