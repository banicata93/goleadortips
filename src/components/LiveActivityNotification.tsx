import { useEffect, useState } from "react";
import { X, Users, Eye } from "lucide-react";

interface Activity {
  id: string;
  type: "subscription" | "viewing";
  message: string;
  timestamp: number;
}

const LiveActivityNotification = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Simulated activities (in real app, this would come from backend)
  const sampleActivities = [
    { type: "subscription" as const, message: "John from UK just subscribed to Gold package" },
    { type: "subscription" as const, message: "Maria from Spain joined Platinum tier" },
    { type: "subscription" as const, message: "Alex from Germany upgraded to Gold" },
    { type: "subscription" as const, message: "Sophie from France subscribed to Silver" },
    { type: "subscription" as const, message: "Marco from Italy joined Platinum" },
    { type: "viewing" as const, message: "12 people viewing this page right now" },
    { type: "viewing" as const, message: "18 people viewing this page right now" },
    { type: "viewing" as const, message: "15 people viewing this page right now" },
  ];

  useEffect(() => {
    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      showRandomActivity();
    }, 3000);

    // Then show new notification every 8-12 seconds
    const interval = setInterval(() => {
      showRandomActivity();
    }, Math.random() * 4000 + 8000); // Random between 8-12 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const showRandomActivity = () => {
    const randomActivity = sampleActivities[Math.floor(Math.random() * sampleActivities.length)];
    const activity: Activity = {
      id: Date.now().toString(),
      type: randomActivity.type,
      message: randomActivity.message,
      timestamp: Date.now(),
    };

    setCurrentActivity(activity);
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!currentActivity || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-in-left">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm flex items-start gap-3">
        <div className="flex-shrink-0">
          {currentActivity.type === "subscription" ? (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground font-medium">
            {currentActivity.message}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Just now
          </p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LiveActivityNotification;
