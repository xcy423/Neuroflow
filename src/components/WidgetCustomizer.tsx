import { useState } from "react";
import type { Widget } from "./SamsungHomeScreen";
import { X, GripVertical, Eye, EyeOff } from "lucide-react";


interface UserSettings {
  showMascot: boolean;
  showSearchBar: boolean;
  showPlusButton: boolean;
}

interface WidgetCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  widgets: Widget[];
  onUpdateWidgets: (widgets: Widget[]) => void;
  userSettings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
}

export default function WidgetCustomizer({
  isOpen,
  onClose,
  widgets,
  onUpdateWidgets,
  userSettings,
  onUpdateSettings,
}: WidgetCustomizerProps) {
  const [localWidgets, setLocalWidgets] = useState(widgets);
  const [localSettings, setLocalSettings] = useState(userSettings);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newWidgets = [...localWidgets];
    const draggedWidget = newWidgets[draggedItem];
    newWidgets.splice(draggedItem, 1);
    newWidgets.splice(index, 0, draggedWidget);

    setLocalWidgets(newWidgets.map((w, i) => ({ ...w, order: i })));
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const toggleWidget = (id: string) => {
    setLocalWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  const toggleSetting = (key: keyof UserSettings) => {
    setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onUpdateWidgets(localWidgets);
    onUpdateSettings(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end animate-fade-in">
      <div className="bg-white w-full max-w-[440px] mx-auto rounded-t-[32px] p-8 animate-slide-up max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-[24px] text-[#2c3e50]">
            Customize Layout
          </h2>
          <button
            onClick={onClose}
            className="size-[32px] rounded-full bg-[#ecf0f1] flex items-center justify-center hover:bg-[#d9d9d9] transition-colors"
          >
            <X className="size-[20px]" strokeWidth={2} />
          </button>
        </div>

        {/* Widgets Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-[18px] text-[#2c3e50] mb-4">
            Widgets
          </h3>
          <p className="text-[14px] text-[#868686] mb-4">
            Drag to reorder, tap to hide/show
          </p>

          <div className="space-y-2">
            {localWidgets.map((widget, index) => (
              <div
                key={widget.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-4 bg-[#ecf0f1] rounded-[12px] cursor-move transition-all ${
                  draggedItem === index ? "opacity-50 scale-95" : ""
                } ${widget.enabled ? "" : "opacity-50"}`}
              >
                <GripVertical className="text-[#868686] flex-shrink-0" size={20} />
                <span className="flex-1 font-medium text-[#2c3e50]">
                  {widget.name}
                </span>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className="p-2 rounded-full hover:bg-white transition-colors"
                >
                  {widget.enabled ? (
                    <Eye className="text-[#4A90E2]" size={20} />
                  ) : (
                    <EyeOff className="text-[#868686]" size={20} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* UI Elements Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-[18px] text-[#2c3e50] mb-4">
            UI Elements
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#ecf0f1] rounded-[12px]">
              <div>
                <p className="font-medium text-[#2c3e50]">Mascot Speech</p>
                <p className="text-[12px] text-[#868686]">
                  Show Harmony's messages
                </p>
              </div>
              <button
                onClick={() => toggleSetting("showMascot")}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  localSettings.showMascot ? "bg-[#4A90E2]" : "bg-[#868686]"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    localSettings.showMascot ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#ecf0f1] rounded-[12px]">
              <div>
                <p className="font-medium text-[#2c3e50]">Search Bar</p>
                <p className="text-[12px] text-[#868686]">
                  Show search functionality
                </p>
              </div>
              <button
                onClick={() => toggleSetting("showSearchBar")}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  localSettings.showSearchBar ? "bg-[#4A90E2]" : "bg-[#868686]"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    localSettings.showSearchBar ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#ecf0f1] rounded-[12px]">
              <div>
                <p className="font-medium text-[#2c3e50]">+ Button</p>
                <p className="text-[12px] text-[#868686]">Quick mood logging</p>
              </div>
              <button
                onClick={() => toggleSetting("showPlusButton")}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  localSettings.showPlusButton ? "bg-[#4A90E2]" : "bg-[#868686]"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    localSettings.showPlusButton ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-[16px] bg-[#4A90E2] text-white font-bold text-[16px] hover:bg-[#3A80D2] active:scale-95 transition-all"
        >
          Save Changes
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
