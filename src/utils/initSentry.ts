import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export const initSentry = (dsn: string) => {
  if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
      dsn,
      integrations: [
        new Integrations.BrowserTracing(),
      ],
      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
    });
  }
};
