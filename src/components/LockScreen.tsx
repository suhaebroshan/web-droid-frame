import { useState } from "react";
import { Lock } from "lucide-react";
import { StatusBar } from "./StatusBar";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newY = Math.max(0, Math.min(200, clientY - 400));
    setDragY(newY);
    
    if (newY > 150) {
      onUnlock();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragY(0);
  };

  const date = new Date();

  return (
    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl relative overflow-hidden">
      <StatusBar />
      
      {/* Wallpaper overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400')] bg-cover bg-center opacity-30" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="text-center mb-32">
          <div className="text-7xl font-light mb-2">
            {date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false })}
          </div>
          <div className="text-xl opacity-90">
            {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
        </div>

        <div className="absolute bottom-32 flex flex-col items-center">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform"
            style={{ transform: `translateY(${dragY}px)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 animate-bounce">
              <Lock className="w-8 h-8" />
            </div>
            <div className="text-sm opacity-75">Swipe up to unlock</div>
          </div>
        </div>
      </div>
    </div>
  );
};
