import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const HeroVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Start not playing
  const [isMuted, setIsMuted] = useState(true); // Start muted

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []); // Play video when component mounts

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative h-[100vh] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://res.cloudinary.com/djrbv23s0/video/upload/v1738317354/HeroHome_dmnjou.mp4"
        loop
        muted={isMuted}
      />
      <div className="absolute inset-0"></div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInVariants}
          className="text-4xl mt-96 sm:text-5xl md:text-6xl hero-title font-bold text-white mb-8"
        >
          ELEGANCE REDEFINED
        </motion.h1>
        {/* <motion.button
          variants={fadeInVariants}
          className="px-8 py-3 border border-white text-white font-semibold text-lg shadow-lg hover:bg-opacity-10 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button> */}
      </motion.div>

      {/* Controls */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6 text-white">
        <button onClick={togglePlayPause} className="text-lg">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={toggleMute} className="text-lg">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div> */}
    </div>
  );
};

export default HeroVideo;
