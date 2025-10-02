import { useState, useRef, useEffect } from "react";
import { X, Circle, RotateCcw, Image } from "lucide-react";

interface CameraProps {
  onClose: () => void;
}

export const Camera = ({ onClose }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setPhoto(canvas.toDataURL("image/png"));
      }
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col animate-scale-in relative">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white">
          <X className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {photo ? (
          <img src={photo} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-center gap-8">
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white">
          <Image className="w-6 h-6" />
        </button>
        <button
          onClick={photo ? () => setPhoto(null) : takePhoto}
          className="w-20 h-20 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
        >
          {!photo && <Circle className="w-16 h-16 text-white fill-white" />}
        </button>
        <div className="w-12 h-12" />
      </div>
    </div>
  );
};
