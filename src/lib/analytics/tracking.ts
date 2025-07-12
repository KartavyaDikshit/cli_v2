import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag: (...args: (string | EventParams)[]) => void;
  }
}

/**
 * Initializes Google Analytics 4.
 * Call this once at the root of your application.
 */
export const initGA4 = (measurementId: string) => {
  if (typeof window !== 'undefined') {
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        send_page_view: false, // Disable automatic page views to handle them manually
      });
    `;
    document.head.appendChild(script2);

    console.log('Google Analytics 4 initialized.');
  }
};

/**
 * Tracks a page view for GA4.
 * Use this in your _app.tsx or layout component to track route changes.
 */
export const trackPageView = (url: string, measurementId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', measurementId, {
      page_path: url,
    });
    console.log(`GA4 Page View: ${url}`);
  }
};

/**
 * Tracks a custom event for GA4.
 */
export const trackEvent = (eventName: string, params: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
    console.log(`GA4 Event: ${eventName}`, params);
  }
};

/**
 * Custom hook to track page views on route changes for Next.js applications.
 * Integrates with Next.js i18n for multilingual tracking.
 */
export const useGATracking = (measurementId: string) => {
  const router = useRouter();

  useEffect(() => {
    // Initial page view on mount
    trackPageView(router.asPath, measurementId);

    const handleRouteChange = (url: string) => {
      trackPageView(url, measurementId);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath, measurementId]);
};

/**
 * Tracks conversion funnel steps.
 * Example: trackFunnelStep('checkout_step_1', { item_id: 'SKU123' });
 */
export const trackFunnelStep = (stepName: string, params: EventParams) => {
  trackEvent(`funnel_step_${stepName}`, params);
};

/**
 * Placeholder for privacy compliance features.
 * In a real application, this would handle consent management (e.g., cookie consent).
 */
export const setConsent = (consentGranted: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'ad_storage': consentGranted ? 'granted' : 'denied',
      'analytics_storage': consentGranted ? 'granted' : 'denied'
    });
    console.log(`GA4 Consent updated: ${consentGranted ? 'granted' : 'denied'}`);
  }
};

/**
 * Example of tracking multilingual user behavior.
 * This could be called when the user switches language.
 */
export const trackLanguageChange = (newLanguage: string) => {
  trackEvent('language_change', { new_language: newLanguage });
};
