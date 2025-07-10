"use client";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const isMuted = videoRef.current.muted;
      videoRef.current.muted = !isMuted;
      setMuted(!muted);
    }
  };

  return (
    <div className="relative min-h-[50vh] md:min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        autoPlay
        playsInline
        muted={muted}
        poster="/images/banner1.jpg"
      >
        <source src="/video/join_aimim.mp4" type="video/mp4" />
      </video>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 bg-green-500   text-white p-2 rounded-full backdrop-blur-md transition animate-bounce"
        aria-label="Toggle Mute"
      >
        {muted ? (
          <VolumeX className="w-5 h-5 md:size-8" />
        ) : (
          <Volume2 className="w-5 h-5 md:size-8" />
        )}
      </button>
    </div>
  );
}
