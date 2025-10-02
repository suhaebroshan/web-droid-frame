import { useState, useEffect } from "react";
import { X, Clock as ClockIcon, Timer, Hourglass, AlarmClock } from "lucide-react";

interface ClockProps {
  onClose: () => void;
}

export const Clock = ({ onClose }: ClockProps) => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"clock" | "alarm" | "timer" | "stopwatch">("clock");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const tabs = [
    { id: "clock", label: "Clock", icon: ClockIcon },
    { id: "alarm", label: "Alarm", icon: AlarmClock },
    { id: "timer", label: "Timer", icon: Timer },
    { id: "stopwatch", label: "Stopwatch", icon: Hourglass },
  ];

  return (
    <div className="w-full h-full bg-background flex flex-col animate-scale-in">
      <div className="bg-card p-4 flex items-center justify-between border-b border-border">
        <h2 className="text-lg font-semibold">Clock</h2>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        {activeTab === "clock" && (
          <div className="text-center">
            <div className="text-7xl font-light mb-4 font-mono">{formatTime(time)}</div>
            <div className="text-xl text-muted-foreground">
              {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </div>
          </div>
        )}
        {activeTab !== "clock" && (
          <div className="text-center text-muted-foreground">
            <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} feature</p>
          </div>
        )}
      </div>
    </div>
  );
};
