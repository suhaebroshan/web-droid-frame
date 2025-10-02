import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-muted/30 to-background">
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-[14px] border-gray-900 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[30px] bg-black rounded-b-3xl z-50">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-800 rounded-full" />
            <div className="absolute top-2 right-6 w-2 h-2 bg-gray-800 rounded-full" />
          </div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-background overflow-hidden">
            {children}
          </div>
        </div>

        {/* Power Button */}
        <div className="absolute right-0 top-[180px] w-[4px] h-[60px] bg-gray-900 rounded-l-sm" />
        
        {/* Volume Buttons */}
        <div className="absolute left-0 top-[150px] w-[4px] h-[40px] bg-gray-900 rounded-r-sm" />
        <div className="absolute left-0 top-[200px] w-[4px] h-[40px] bg-gray-900 rounded-r-sm" />
      </div>
    </div>
  );
};
