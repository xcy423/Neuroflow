import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import SamsungHomeScreen from "./components/SamsungHomeScreen";
import type { Widget } from "./components/SamsungHomeScreen";
import EnhancedCoursesScreen from "./components/EnhancedCoursesScreen";
import EnhancedChallengesScreen from "./components/EnhancedChallengesScreen";
import ChallengeSessionScreen from "./components/ChallengeSessionScreen";
import type { ChallengeInfo, ChallengeUserRank } from "./types/challenge";
import SanctuaryScreen from "./components/SanctuaryScreen";
import EnhancedSanctuaryScreen from "./components/EnhancedSanctuaryScreen";
import ProfileScreen from "./components/ProfileScreen";
import MoodInputModal from "./components/MoodInputModal";
import HarmonyCardModal from "./components/HarmonyCardModal";
import { handleSubmitMoodLog, type CardType } from "./data/harmonyCards";
import WidgetCustomizer from "./components/WidgetCustomizer";
import WidgetDetailScreen from "./components/WidgetDetailScreen";
import StreakHistoryModal from "./components/StreakHistoryModal";
import CleanBottomNav from "./components/CleanBottomNav";
import CleanStickyMascot from "./components/CleanStickyMascot";
import DynamicIslandAnnotation from "./components/DynamicIslandAnnotation";
import { useSwipeNavigation } from "./hooks/useSwipeNavigation";

type Screen =
  | "home"
  | "courses"
  | "challenges"
  | "sanctuary"
  | "profile"
  | "widgetDetail"
  | "challengeSession";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [selectedWidget, setSelectedWidget] = useState<Widget["type"] | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<ChallengeInfo | null>(null);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false);
  const [showWidgetCustomizer, setShowWidgetCustomizer] =
    useState(false);
  const [showStreakHistory, setShowStreakHistory] =
    useState(false);
  const [harmonyCardType, setHarmonyCardType] = useState<CardType>("spark");
  const [showHarmonyCard, setShowHarmonyCard] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  // Define page order for swipe navigation
  const pageOrder: Screen[] = ["home", "courses", "challenges", "profile"];

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

  const handleMoodSubmit = (mood: string, drivers?: string[], note?: string) => {
    setMoodLogCount((prev) => prev + 1);
    setStreakDays((prev) => prev + 1);

    // Determine card type immediately (pure computation, no side-effects)
    const cardType = handleSubmitMoodLog(mood, drivers ?? [], note ?? "");
    setHarmonyCardType(cardType);

    // Close the mood modal first, then show the Harmony Card after it has
    // finished its exit animation (~300 ms) so the two modals never overlap.
    setShowMoodModal(false);
    setTimeout(() => {
      setShowHarmonyCard(true);
      toast.success("Mood logged! Your Harmony Card is ready ✨");
    }, 320);

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

  // Swipe navigation handlers
  const handleSwipeLeft = () => {
    // Swipe left = go to next page
    const currentIndex = pageOrder.indexOf(currentScreen as any);
    if (currentIndex !== -1 && currentIndex < pageOrder.length - 1) {
      setSwipeDirection("left");
      setCurrentScreen(pageOrder[currentIndex + 1]);
      setSelectedWidget(null);
    }
  };

  const handleSwipeRight = () => {
    // Swipe right = go to previous page
    const currentIndex = pageOrder.indexOf(currentScreen as any);
    if (currentIndex > 0) {
      setSwipeDirection("right");
      setCurrentScreen(pageOrder[currentIndex - 1]);
      setSelectedWidget(null);
    }
  };

  // Attach swipe navigation to the main content area
  const swipeRef = useSwipeNavigation({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 100, // 100px minimum swipe distance
    velocityThreshold: 0.3, // Fast swipes work even with shorter distance
  });

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
        return <EnhancedCoursesScreen onNavigateHome={handleBackToHome} />;
      case "challenges":
        return (
          <EnhancedChallengesScreen
            onNavigateHome={handleBackToHome}
            onCreateChallengeModalChange={setShowCreateChallengeModal}
            onOpenChallenge={(challenge) => {
              setActiveChallenge({
                id: challenge.id,
                title: challenge.title,
                category: challenge.category,
                icon: challenge.icon,
                description: challenge.description,
                timeLeft: challenge.timeLeft,
                participants: challenge.participants,
                joined: challenge.joined,
                topUsers: challenge.topUsers as ChallengeUserRank[]
              });
              setCurrentScreen("challengeSession");
            }}
          />
        );
      case "challengeSession":
        return activeChallenge ? (
          <ChallengeSessionScreen
            challenge={activeChallenge}
            onBack={() => setCurrentScreen("challenges")}
            onCompleteToday={() => {
              // basic demo increment: reflect a join or progress change
              toast.success("Challenge progress updated ✅");
            }}
          />
        ) : null;
      case "sanctuary":
        return (
          <EnhancedSanctuaryScreen
            completedChallenges={completedChallenges}
            wellnessScore={wellnessScore}
            onClose={handleBackToHome}
          />
        );
      case "profile":
        return <ProfileScreen onNavigateHome={handleBackToHome} />;
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

  // Show bottom nav on all main pages except sanctuary and widget detail, and hide when create challenge modal is open
  const showBottomNav = ["home", "courses", "challenges", "profile"].includes(currentScreen) && !showCreateChallengeModal;
  const showMascot =
    userSettings.showMascot &&
    currentScreen !== "sanctuary" &&
    currentScreen !== "widgetDetail";

  // compute extra bottom padding so scroll area extends past fixed overlays
  // Trimmed values to reduce heavy bottom spacing while keeping elements clear
  const extraBottomBase = showBottomNav ? 180 : 120; // enough for rounded nav + raised plus
  const extraBottomMascot = showMascot ? 80 : 0; // some clearance when mascot is visible
  const paddingBottomValue = `calc(env(safe-area-inset-bottom, 0px) + ${extraBottomBase + extraBottomMascot}px)`;

  // Animation variants for swipe transitions - NO FADE for better UX
  const pageVariants = {
    enter: (direction: "left" | "right" | null) => ({
      x: direction === "left" ? "100%" : direction === "right" ? "-100%" : 0,
    }),
    center: {
      x: 0,
    },
    exit: (direction: "left" | "right" | null) => ({
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    }),
  };

  const pageTransition = {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1] as const,
    duration: 0.2,
  };

  return (
    <div className="relative w-full min-h-screen bg-[#fcfcfc] flex items-center justify-center">
      {/* Main App Container - Responsive with iPhone Dynamic Island Support */}
      {/* harmony-dimmed is added when the Harmony Card is open — CSS filter
          dims every pixel in this subtree (including Framer Motion stacking
          contexts) without any z-index conflicts. */}
      <div
        className={`relative w-full max-w-[440px] min-w-[320px] h-screen bg-[#fcfcfc] overflow-hidden mx-auto shadow-2xl${
            showHarmonyCard
              ? " harmony-dimmed"
              : (showMoodModal || showWidgetCustomizer || showStreakHistory || showCreateChallengeModal)
              ? " modal-dimmed"
              : ""
          }`}
        style={{
          // Support for iPhone Safe Areas and Dynamic Island
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Main Content - Scrollable with proper insets and swipe navigation */}
        <div
          ref={swipeRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden relative"
          style={{
            // ensure scrolling area extends past fixed bottom elements (bottom nav / mascot)
            // computed so presence/absence of bottom nav/mascot is respected
            paddingBottom: paddingBottomValue,
          }}
        >
          <AnimatePresence mode="popLayout" custom={swipeDirection} initial={false}>
            <motion.div
              key={currentScreen}
              custom={swipeDirection}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              onAnimationComplete={() => setSwipeDirection(null)}
              className="w-full h-full absolute inset-0"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation - ONLY ONE INSTANCE */}
        {showBottomNav && (
          <CleanBottomNav
            currentScreen={(["home", "courses", "challenges", "profile"].includes(currentScreen) ? currentScreen : "home") as "home" | "courses" | "challenges" | "profile"}
            onNavigate={handleNavigate}
            onPlusClick={handlePlusClick}
            showPlusButton={userSettings.showPlusButton}
          />
        )}

        {/* Sticky Mascot - Non-overlapping */}
        {showMascot && (
          <CleanStickyMascot
            currentScreen={( ["home","courses","challenges","profile"].includes(currentScreen) ? currentScreen : "challenges") as "home"|"courses"|"challenges"|"profile"}
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

        {/* Harmony Card — shown after mood log submission */}
        <HarmonyCardModal
          isOpen={showHarmonyCard}
          cardType={harmonyCardType}
          onClose={() => setShowHarmonyCard(false)}
        />

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </div>
    </div>
  );
}