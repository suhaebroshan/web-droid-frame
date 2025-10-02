import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LockScreen } from "@/components/LockScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { Calculator } from "@/components/apps/Calculator";
import { Clock } from "@/components/apps/Clock";
import { Settings } from "@/components/apps/Settings";
import { Camera } from "@/components/apps/Camera";

const Index = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [openApp, setOpenApp] = useState<string | null>(null);

  const handleOpenApp = (appId: string) => {
    setOpenApp(appId);
  };

  const handleCloseApp = () => {
    setOpenApp(null);
  };

  const renderApp = () => {
    switch (openApp) {
      case "calculator":
        return <Calculator onClose={handleCloseApp} />;
      case "clock":
        return <Clock onClose={handleCloseApp} />;
      case "settings":
        return <Settings onClose={handleCloseApp} />;
      case "camera":
        return <Camera onClose={handleCloseApp} />;
      default:
        return <HomeScreen onOpenApp={handleOpenApp} />;
    }
  };

  return (
    <PhoneFrame>
      {isLocked ? (
        <LockScreen onUnlock={() => setIsLocked(false)} />
      ) : (
        renderApp()
      )}
    </PhoneFrame>
  );
};

export default Index;
