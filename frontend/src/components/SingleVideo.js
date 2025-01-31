import React, { useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-auto overflow-hidden mt-0.5">
      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full h-auto"
        src="/assets/video4.mp4"
        muted={isMuted}
        autoPlay
        loop
      >
        Your browser does not support the video tag.
      </video>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button onClick={togglePlayPause} className="text-white text-s">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={toggleMuteUnmute} className="text-white text-s">
          {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
