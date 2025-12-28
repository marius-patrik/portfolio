import { IconPalette, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { Window } from "../../Window/Window";
import { Appearance } from "./Appearance";

interface SettingsProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

type SettingsSection = "appearance";

const menuItems: {
  id: SettingsSection;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "appearance", label: "Appearance", icon: <IconPalette size={20} /> },
];

export const Settings = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: SettingsProps) => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("appearance");

  const renderContent = () => {
    switch (activeSection) {
      case "appearance":
        return <Appearance />;
    }
  };

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconSettings size={18} /> Settings
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left sidebar */}
        <div className="overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`button flex flex-row w-full p-2 gap-2 justify-start ${
                activeSection === item.id
                  ? "glass selected"
                  : "hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right content area */}
        <div className="flex-1 overflow-y-auto md:h-full">
          {renderContent()}
        </div>
      </div>
    </Window>
  );
};
