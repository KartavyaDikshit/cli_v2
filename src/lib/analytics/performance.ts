
import { ReportHandler } from 'web-vitals';

interface Metric {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
}

type AnalyticsProvider = (metric: Metric) => void;

const analyticsProviders: AnalyticsProvider[] = [];

export const addAnalyticsProvider = (provider: AnalyticsProvider) => {
  analyticsProviders.push(provider);
};

export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ onLCP, onFID, onCLS, onINP }) => {
      onLCP((metric) => {
        onPerfEntry(metric);
        analyticsProviders.forEach((provider) => provider(metric));
      });
      onFID((metric) => {
        onPerfEntry(metric);
        analyticsProviders.forEach((provider) => provider(metric));
      });
      onCLS((metric) => {
        onPerfEntry(metric);
        analyticsProviders.forEach((provider) => provider(metric));
      });
      onINP((metric) => {
        onPerfEntry(metric);
        analyticsProviders.forEach((provider) => provider(metric));
      });
    });
  }
};

// Example of a custom analytics provider (e.g., sending to a backend endpoint)
export const customAnalyticsProvider: AnalyticsProvider = (metric) => {
  const payload = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
    // You might want to send more detailed information from metric.entries
  };

  // In a real application, you would send this data to your monitoring endpoint
  // using fetch or a dedicated analytics SDK.
  console.log(`Sending metric to analytics endpoint: ${JSON.stringify(payload)}`);
  /*
  fetch('/api/performance-metrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).catch(error => {
    console.error('Failed to send performance metric:', error);
  });
  */
};

// Add the custom analytics provider
addAnalyticsProvider(customAnalyticsProvider);
