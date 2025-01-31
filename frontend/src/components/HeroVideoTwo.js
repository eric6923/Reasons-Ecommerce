import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const HeroVideoTwo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Add event listeners to handle playback state
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleLoadedData = () => setIsLoaded(true);

      videoRef.current.addEventListener('play', handlePlay);
      videoRef.current.addEventListener('pause', handlePause);
      videoRef.current.addEventListener('loadeddata', handleLoadedData);

      // Attempt to play with error handling
      const attemptPlay = async () => {
        try {
          // Ensure video is muted initially to allow autoplay
          videoRef.current.muted = true;
          setIsMuted(true);
          
          // Use the play promise to handle autoplay restrictions
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        }
      };

      if (isLoaded) {
        attemptPlay();
      }

      // Cleanup
      return () => {
        const video = videoRef.current;
        if (video) {
          video.removeEventListener('play', handlePlay);
          video.removeEventListener('pause', handlePause);
          video.removeEventListener('loadeddata', handleLoadedData);
        }
      };
    }
  }, [isLoaded]);

  const togglePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
    } catch (error) {
      console.log("Playback error:", error);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
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
    <div className="relative h-screen overflow-hidden mt-1">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://res.cloudinary.com/djrbv23s0/video/upload/v1738317359/HeroHomeTwo_sw7mgm.mp4"
        loop
        muted={isMuted}
        playsInline // Add playsinline attribute
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

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
          CELEBRATION OF LOVE
        </motion.h1>
      </motion.div>

      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6 text-white">
        <button 
          onClick={togglePlayPause} 
          className="text-lg p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button 
          onClick={toggleMute} 
          className="text-lg p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div> */}
    </div>
  );
};

export default HeroVideoTwo;