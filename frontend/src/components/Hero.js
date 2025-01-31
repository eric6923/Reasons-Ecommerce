import React, { useRef } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const videoRef = useRef(null);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative h-screen overflow-hidden p-10">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/djrbv23s0/video/upload/v1738316704/Hero_mj3xaf.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0"></div>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeInVariants}
          className="text-lg mt-96 text-white text-center font-bold max-w-2xl mb-6"
        >
          The Strength of Elegance - Explore Our Western Collection{" "}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;