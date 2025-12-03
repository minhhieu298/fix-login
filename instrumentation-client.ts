// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Dùng tunnel để proxy sự kiện/envelope tới self-hosted hoặc SaaS
  tunnel:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/sentry/tunnel`
      : undefined,
  // Release configuration for health monitoring
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || "development",
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV || "development",
  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: false,
      maskAllInputs: true,
      stickySession: true,
      // Cho phép capture ảnh từ tất cả các domain (allow all)
      networkDetailAllowUrls: [
        /.*/, // Allow tất cả URLs với regex
        // Hoặc có thể dùng: "*" để allow tất cả
      ],
      // Cho phép capture ảnh và media
      networkCaptureBodies: true,
      maskFn: (text) => {
        return text.replace(/\d/g, "*");
      },
    }),

    Sentry.browserProfilingIntegration(),
    Sentry.browserTracingIntegration({
      // Enable profiling
      enableLongTask: true,
      enableInp: true,
    }),
    Sentry.breadcrumbsIntegration({
      console: true,
      dom: true,
      fetch: true,
      history: true,
      xhr: true,
    }),
    Sentry.consoleLoggingIntegration({
      levels: ["log", "warn", "error", "info", "debug"],
    }),
    Sentry.httpClientIntegration(),
    Sentry.browserApiErrorsIntegration({
      setTimeout: true,
      setInterval: true,
      requestAnimationFrame: true,
      XMLHttpRequest: true,
      eventTarget: true,
      unregisterOriginalCallbacks: true,
    }),
    Sentry.zodErrorsIntegration(),
    Sentry.browserSessionIntegration(),
    Sentry.captureConsoleIntegration(),
    Sentry.contextLinesIntegration(),
    Sentry.extraErrorDataIntegration(),
    Sentry.featureFlagsIntegration(),
    Sentry.launchDarklyIntegration(),
    Sentry.moduleMetadataIntegration(),
    Sentry.rewriteFramesIntegration(),
    Sentry.reportingObserverIntegration(),
    Sentry.replayCanvasIntegration(),
    Sentry.captureRequestError,
    Sentry.captureUnderscoreErrorException,
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable profiling
  profilesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // Giảm sample rate cho production để tránh vấn đề performance
  replaysSessionSampleRate: 1.0,

  // Define how likely Replay events are sampled when an error occurs.
  // Giữ 100% khi có error để debug
  replaysOnErrorSampleRate: 1.0,

  // Send default PII data
  sendDefaultPii: true,

  // Cấu hình để xử lý Mixed Content và CORS
  // transportOptions sẽ được cấu hình tự động bởi Sentry

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
