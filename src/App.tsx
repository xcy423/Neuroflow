import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import SamsungHomeScreen from "./components/SamsungHomeScreen";
import type { Widget } from "./components/SamsungHomeScreen";
import EnhancedCoursesScreen from "./components/EnhancedCoursesScreen";
import EnhancedChallengesScreen from "./components/EnhancedChallengesScreen";
import SanctuaryScreen from "./components/SanctuaryScreen";
import EnhancedSanctuaryScreen from "./components/EnhancedSanctuaryScreen";
import ProfileScreen from "./components/ProfileScreen";
import MoodInputModal from "./components/MoodInputModal";
import WidgetCustomizer from "./components/WidgetCustomizer";
import WidgetDetailScreen from "./components/WidgetDetailScreen";
import StreakHistoryModal from "./components/StreakHistoryModal";
import CleanBottomNav from "./components/CleanBottomNav";
import CleanStickyMascot from "./components/CleanStickyMascot";
import DynamicIslandAnnotation from "./components/DynamicIslandAnnotation";

type Screen =
  | "home"
  | "courses"
  | "challenges"
  | "sanctuary"
  | "profile"
  | "widgetDetail";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [selectedWidget, setSelectedWidget] =
    useState<Widget["type"] | null>(null);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showWidgetCustomizer, setShowWidgetCustomizer] =
    useState(false);
  const [showStreakHistory, setShowStreakHistory] =
    useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  const [userSettings, setUserSettings] = useState({
    showMascot: true,
    showSearchBar: true,
    showPlusButton: true,
  });

  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "streak",
      name: "Daily Goal",
      enabled: true,
      order: 0,
      type: "streak",
    },
    { id: "steps", name: "Steps", enabled: true, order: 1, type: "steps" },
    {
      id: "sleep",
      name: "Sleep Score",
      enabled: true,
      order: 2,
      type: "sleep",
    },
    { id: "hrv", name: "HRV", enabled: true, order: 3, type: "hrv" },
    {
      id: "wellnessScore",
      name: "Wellness Score",
      enabled: false,
      order: 4,
      type: "wellnessScore",
    },
    {
      id: "moodTrends",
      name: "Mood Trends",
      enabled: false,
      order: 5,
      type: "moodTrends",
    },
  ]);

  const [moodLogCount, setMoodLogCount] = useState(23);
  const [streakDays, setStreakDays] = useState(23);
  const [completedChallenges, setCompletedChallenges] =
    useState(5);
  const [wellnessScore, setWellnessScore] = useState(81);
  const [mascotQuoteIndex, setMascotQuoteIndex] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(false);

  // First-time user flow
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsFirstTimeUser(true);
      setTimeout(() => {
        setShowMoodModal(true);
      }, 1500);
    } else {
      setIsFirstTimeUser(false);
    }
  }, []);

  const handleMoodSubmit = (mood: string, note?: string) => {
    setMoodLogCount((prev) => prev + 1);
    setStreakDays((prev) => prev + 1);
    setShowMoodModal(false);
    toast.success("Mood logged successfully! 🌟");

    if (isFirstTimeUser) {
      localStorage.setItem("hasVisited", "true");
      setIsFirstTimeUser(false);
      setTimeout(() => {
        toast.success(
          "Sanctuary unlocked! Visit your peaceful space 🏞️",
          {
            duration: 4000,
          },
        );
      }, 500);
    }

    setWellnessScore((prev) => Math.min(100, prev + 2));
  };

  const handleNavigate = (
    screen:
      | "home"
      | "courses"
      | "challenges"
      | "sanctuary"
      | "profile",
  ) => {
    setCurrentScreen(screen);
    setSelectedWidget(null);
  };

  const handleWidgetClick = (widgetId: string) => {
    // Accept string for SamsungHomeScreen compatibility
  setSelectedWidget(widgetId as Widget["type"]);
    setCurrentScreen("widgetDetail");
  };

  const handleStreakClick = () => {
    setShowStreakHistory(true);
  };

  const handleLayoutClick = () => {
    setShowWidgetCustomizer(true);
  };

  const handlePlusClick = () => {
    setShowMoodModal(true);
  };

  const handleMascotClick = () => {
    setCurrentScreen("sanctuary");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setSelectedWidget(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <SamsungHomeScreen
            widgets={widgets}
            userSettings={userSettings}
            moodLogCount={moodLogCount}
            streakDays={streakDays}
            wellnessScore={wellnessScore}
            onLayoutClick={handleLayoutClick}
            onPlusClick={handlePlusClick}
            onSanctuaryClick={handleMascotClick}
            onWidgetClick={handleWidgetClick}
            onStreakClick={handleStreakClick}
          />
        );
      case "courses":
        return <EnhancedCoursesScreen />;
      case "challenges":
        return <EnhancedChallengesScreen />;
      case "sanctuary":
        return (
          <EnhancedSanctuaryScreen
            completedChallenges={completedChallenges}
            wellnessScore={wellnessScore}
            onClose={handleBackToHome}
          />
        );
      case "profile":
        return <ProfileScreen />;
      case "widgetDetail":
        return selectedWidget ? (
          <WidgetDetailScreen
            widgetType={selectedWidget}
            onBack={handleBackToHome}
            onLogActivity={() => {
              toast.success("Activity logged! 🎉");
              setWellnessScore((prev) =>
                Math.min(100, prev + 3),
              );
            }}
          />
        ) : null;
      default:
        return (
          <SamsungHomeScreen
            widgets={widgets}
            userSettings={userSettings}
            moodLogCount={moodLogCount}
            streakDays={streakDays}
            wellnessScore={wellnessScore}
            onLayoutClick={handleLayoutClick}
            onPlusClick={handlePlusClick}
            onSanctuaryClick={handleMascotClick}
            onWidgetClick={handleWidgetClick}
            onStreakClick={handleStreakClick}
          />
        );
    }
  };

  const showBottomNav =
    currentScreen !== "sanctuary" &&
    currentScreen !== "widgetDetail";
  const showMascot =
    userSettings.showMascot &&
    currentScreen !== "sanctuary" &&
    currentScreen !== "widgetDetail";

  // compute extra bottom padding so scroll area extends past fixed overlays
  // INCREASED values for more scroll room
  const extraBottomBase = showBottomNav ? 420 : 240; // much more room for bottom nav
  const extraBottomMascot = showMascot ? 180 : 0; // more space if mascot is visible
  const paddingBottomValue = `calc(env(safe-area-inset-bottom, 0px) + ${extraBottomBase + extraBottomMascot}px)`;

  return (
    <div className="relative w-full min-h-screen bg-[#fcfcfc] flex items-center justify-center">
      {/* Main App Container - Responsive with iPhone Dynamic Island Support */}
      <div
        className="relative w-full max-w-[440px] min-w-[320px] min-h-screen bg-[#fcfcfc] overflow-hidden mx-auto shadow-2xl"
        style={{
          // Support for iPhone Safe Areas and Dynamic Island
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Main Content - Scrollable with proper insets */}
        <div
          className="w-full min-h-screen overflow-y-auto overflow-x-hidden"
          style={{
            // ensure scrolling area extends past fixed bottom elements (bottom nav / mascot)
            // computed so presence/absence of bottom nav/mascot is respected
            paddingBottom: paddingBottomValue,
          }}
        >
          {renderScreen()}
        </div>

        {/* Bottom Navigation - ONLY ONE INSTANCE */}
        {showBottomNav && (
          <CleanBottomNav
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onPlusClick={handlePlusClick}
            showPlusButton={userSettings.showPlusButton}
          />
        )}

        {/* Sticky Mascot - Non-overlapping */}
        {showMascot && (
          <CleanStickyMascot
            currentScreen={currentScreen}
            moodLogCount={moodLogCount}
            wellnessScore={wellnessScore}
            onMascotClick={handleMascotClick}
          />
        )}

        {/* Modals */}
        <MoodInputModal
          isOpen={showMoodModal}
          onClose={() => setShowMoodModal(false)}
          onSubmit={handleMoodSubmit}
        />

        <WidgetCustomizer
          isOpen={showWidgetCustomizer}
          onClose={() => setShowWidgetCustomizer(false)}
          widgets={widgets}
          onUpdateWidgets={setWidgets}
          userSettings={userSettings}
          onUpdateSettings={setUserSettings}
        />

        <StreakHistoryModal
          isOpen={showStreakHistory}
          onClose={() => setShowStreakHistory(false)}
          streakDays={streakDays}
          moodLogCount={moodLogCount}
        />

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </div>
    </div>
  );
}