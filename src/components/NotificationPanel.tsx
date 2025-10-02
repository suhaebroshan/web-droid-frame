import { X, Wifi, Bluetooth, Flashlight, AirVent, Volume2, Sun } from "lucide-react";

interface NotificationPanelProps {
  onClose: () => void;
}

export const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const quickSettings = [
    { icon: Wifi, label: "WiFi", active: true },
    { icon: Bluetooth, label: "Bluetooth", active: false },
    { icon: Flashlight, label: "Flashlight", active: false },
    { icon: AirVent, label: "Airplane", active: false },
    { icon: Volume2, label: "Sound", active: true },
    { icon: Sun, label: "Brightness", active: true },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 z-40 animate-slide-down">
      <div className="bg-card/95 backdrop-blur-xl shadow-2xl rounded-b-3xl border-b border-border/50 p-6 pt-12">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Settings</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickSettings.map((setting) => (
              <button
                key={setting.label}
                className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                  setting.active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                }`}
              >
                <setting.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{setting.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Notifications</h3>
          <div className="space-y-2">
            <div className="bg-muted/30 rounded-2xl p-4">
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm font-semibold">System</span>
                <span className="text-xs text-muted-foreground">2m ago</span>
              </div>
              <p className="text-sm text-muted-foreground">Android Emulator is running</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
