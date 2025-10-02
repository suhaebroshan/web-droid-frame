import { useEffect, useState } from "react";
import { Wifi, Battery, Signal } from "lucide-react";

export const StatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-[30px] bg-black/40 backdrop-blur-md z-50 flex items-center justify-between px-8 pt-1 text-white text-xs font-medium">
      <div className="flex items-center gap-1.5">
        <span>{formatTime(time)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
};
