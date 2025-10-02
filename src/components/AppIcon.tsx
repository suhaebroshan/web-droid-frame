import { LucideIcon } from "lucide-react";

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onClick: () => void;
}

export const AppIcon = ({ icon: Icon, label, color, onClick }: AppIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      {label && (
        <span className="text-xs text-white drop-shadow-lg font-medium text-center leading-tight">
          {label}
        </span>
      )}
    </button>
  );
};
