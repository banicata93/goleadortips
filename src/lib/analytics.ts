// Google Analytics wrapper
// Add your GA4 Measurement ID in .env as VITE_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  console.log('✅ Google Analytics initialized');
};

// Track page views
export const trackPageView = (url: string) => {
  if (!window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Predefined events for common actions
export const analytics = {
  // Contact form submission
  contactFormSubmit: (email: string) => {
    trackEvent('submit', 'Contact Form', email);
  },

  // Package selection
  packageClick: (packageName: string) => {
    trackEvent('click', 'Package', packageName);
  },

  // Prediction view
  predictionView: (tier: string) => {
    trackEvent('view', 'Prediction', tier);
  },

  // Navigation
  navClick: (destination: string) => {
    trackEvent('click', 'Navigation', destination);
  },

  // Social share
  socialShare: (platform: string) => {
    trackEvent('share', 'Social', platform);
  },

  // Download
  download: (fileName: string) => {
    trackEvent('download', 'File', fileName);
  },

  // Error tracking
  error: (errorMessage: string, errorLocation: string) => {
    trackEvent('error', 'Error', `${errorLocation}: ${errorMessage}`);
  },

  // User engagement
  timeOnPage: (seconds: number, pageName: string) => {
    trackEvent('engagement', 'Time on Page', pageName, seconds);
  },

  // Scroll depth
  scrollDepth: (percentage: number, pageName: string) => {
    trackEvent('scroll', 'Scroll Depth', pageName, percentage);
  },
};

// Track scroll depth
export const initScrollTracking = () => {
  let maxScroll = 0;
  const thresholds = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          analytics.scrollDepth(threshold, window.location.pathname);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => window.removeEventListener('scroll', handleScroll);
};

// Track time on page
export const initTimeTracking = () => {
  const startTime = Date.now();

  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    analytics.timeOnPage(timeSpent, window.location.pathname);
  };

  // Track on page unload
  window.addEventListener('beforeunload', trackTime);

  return () => window.removeEventListener('beforeunload', trackTime);
};
