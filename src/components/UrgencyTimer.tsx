import { useEffect, useState } from "react";
import { Clock, Gift, Zap } from "lucide-react";

interface UrgencyTimerProps {
  tier?: "silver" | "gold" | "platinum";
  className?: string;
}

const UrgencyTimer = ({ tier = "silver", className = "" }: UrgencyTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes (2 hours) in seconds
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if timer was already started in this session
    const timerKey = `urgency_timer_${tier}`;
    const savedEndTime = localStorage.getItem(timerKey);
    
    let endTime: number;
    
    if (savedEndTime) {
      endTime = parseInt(savedEndTime);
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      
      if (remaining === 0) {
        setIsVisible(false);
        return;
      }
      
      setTimeLeft(remaining);
    } else {
      // Start new timer - 2 hours
      endTime = Date.now() + (120 * 60 * 1000);
      localStorage.setItem(timerKey, endTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        setIsVisible(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tier]);

  if (!isVisible) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const offers = {
    silver: {
      title: "🎁 SPECIAL OFFER",
      description: "Order Silver package in the next",
      bonus: "+1 FREE PREDICTION",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    gold: {
      title: "🎁 SPECIAL OFFER",
      description: "Order Gold package in the next",
      bonus: "+2 FREE PREDICTIONS",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
    },
    platinum: {
      title: "🎁 VIP OFFER",
      description: "Order Platinum package in the next",
      bonus: "+3 FREE VIP PREDICTIONS",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
  };

  const offer = offers[tier];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`${offer.bgColor} ${offer.borderColor} border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm animate-pulse-slow`}>
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${offer.color} flex items-center justify-center animate-bounce-slow`}>
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wide">
                {offer.title}
              </h3>
            </div>
            
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">
              {offer.description}
            </p>

            {/* Timer */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <div className="flex items-center gap-0.5 sm:gap-1">
                <div className={`bg-gradient-to-br ${offer.color} text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-bold text-base sm:text-lg min-w-[2.5rem] sm:min-w-[3rem] text-center`}>
                  {String(minutes).padStart(2, '0')}
                </div>
                <span className="text-base sm:text-lg font-bold text-foreground">:</span>
                <div className={`bg-gradient-to-br ${offer.color} text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-bold text-base sm:text-lg min-w-[2.5rem] sm:min-w-[3rem] text-center`}>
                  {String(seconds).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Bonus */}
            <div className={`inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r ${offer.color} text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-bold shadow-lg`}>
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">{offer.bonus}</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl"></div>
      </div>

      {/* Urgency text */}
      <div className="text-center mt-1.5 sm:mt-2">
        <p className="text-[10px] sm:text-xs text-muted-foreground italic">
          ⚡ Offer expires in {minutes} {minutes === 1 ? 'minute' : 'minutes'}
        </p>
      </div>
    </div>
  );
};

export default UrgencyTimer;
