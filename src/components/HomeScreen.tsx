import { StatusBar } from "./StatusBar";
import { NotificationPanel } from "./NotificationPanel";
import { AppIcon } from "./AppIcon";
import { useState } from "react";
import { Calculator, Clock, Settings, Camera, Image, Phone, MessageSquare, Mail, Music, Globe, Calendar } from "lucide-react";

interface HomeScreenProps {
  onOpenApp: (appId: string) => void;
}

export const HomeScreen = ({ onOpenApp }: HomeScreenProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [dragY, setDragY] = useState(0);

  const apps = [
    { id: "phone", name: "Phone", icon: Phone, color: "from-green-500 to-green-600" },
    { id: "messages", name: "Messages", icon: MessageSquare, color: "from-blue-500 to-blue-600" },
    { id: "mail", name: "Mail", icon: Mail, color: "from-red-500 to-red-600" },
    { id: "camera", name: "Camera", icon: Camera, color: "from-gray-700 to-gray-800" },
    { id: "gallery", name: "Gallery", icon: Image, color: "from-purple-500 to-purple-600" },
    { id: "clock", name: "Clock", icon: Clock, color: "from-orange-500 to-orange-600" },
    { id: "calculator", name: "Calculator", icon: Calculator, color: "from-gray-600 to-gray-700" },
    { id: "settings", name: "Settings", icon: Settings, color: "from-gray-500 to-gray-600" },
    { id: "music", name: "Music", icon: Music, color: "from-pink-500 to-pink-600" },
    { id: "browser", name: "Browser", icon: Globe, color: "from-blue-600 to-blue-700" },
    { id: "calendar", name: "Calendar", icon: Calendar, color: "from-indigo-500 to-indigo-600" },
  ];

  const dockApps = apps.slice(0, 4);
  const homeApps = apps.slice(4);

  const handleTouchMove = (e: React.TouchEvent) => {
    const startY = e.touches[0].clientY;
    if (startY < 100) {
      const newY = Math.max(0, startY);
      setDragY(newY);
      if (newY > 50) {
        setShowNotifications(true);
      }
    }
  };

  return (
    <div 
      className="w-full h-full bg-gradient-to-br from-background to-muted/30 relative overflow-hidden"
      onTouchMove={handleTouchMove}
    >
      <StatusBar />
      
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400')] bg-cover bg-center opacity-20" />
      
      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}

      {/* App Grid */}
      <div className="relative z-10 pt-16 px-6 pb-32">
        <div className="grid grid-cols-4 gap-6">
          {homeApps.map((app) => (
            <AppIcon
              key={app.id}
              icon={app.icon}
              label={app.name}
              color={app.color}
              onClick={() => onOpenApp(app.id)}
            />
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-0 right-0 px-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/20">
          <div className="grid grid-cols-4 gap-4">
            {dockApps.map((app) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                label=""
                color={app.color}
                onClick={() => onOpenApp(app.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full" />
    </div>
  );
};
