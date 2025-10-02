import { X, Wifi, Bluetooth, Volume2, Bell, Moon, User, Lock, Database, Info } from "lucide-react";

interface SettingsProps {
  onClose: () => void;
}

export const Settings = ({ onClose }: SettingsProps) => {
  const settingsItems = [
    { icon: Wifi, label: "Network & Internet", subtitle: "WiFi, mobile, data usage" },
    { icon: Bluetooth, label: "Connected devices", subtitle: "Bluetooth, USB" },
    { icon: Volume2, label: "Sound & vibration", subtitle: "Volume, ringtone" },
    { icon: Bell, label: "Notifications", subtitle: "App notifications" },
    { icon: Moon, label: "Display", subtitle: "Brightness, dark mode" },
    { icon: User, label: "Accounts", subtitle: "Google, contacts" },
    { icon: Lock, label: "Security & privacy", subtitle: "Screen lock, passwords" },
    { icon: Database, label: "Storage", subtitle: "12.4 GB used of 128 GB" },
    { icon: Info, label: "About phone", subtitle: "Android 14" },
  ];

  return (
    <div className="w-full h-full bg-background flex flex-col animate-scale-in">
      <div className="bg-card p-4 flex items-center justify-between border-b border-border">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {settingsItems.map((item) => (
            <button
              key={item.label}
              className="w-full p-4 rounded-2xl hover:bg-muted transition-colors flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
